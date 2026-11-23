import multer from "multer";

const CLIENT_ERRORS = new Map([
  ["Required fields are incompleted", "Complete the required fields"],
  ["Required fields incompleted", "Complete the required fields"],
  ["Required fields are uncompleted", "Complete the required fields"],
  ["Invalid user or password", "Invalid user or password"],
  ["Invalid image format", "Invalid image format"],
]);

function getPrismaError(err) {
  return typeof err?.code === "string" && /^P\d{4}$/.test(err.code);
}

function normalizeError(err) {
  if (err?.type === "entity.parse.failed") {
    return { status: 400, message: "Invalid JSON body" };
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return { status: 400, message: "The image must not exceed 5 MB" };
    }

    return { status: 400, message: "Invalid file upload" };
  }

  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    return { status: 401, message: "Invalid or expired authorization token" };
  }

  if (getPrismaError(err)) {
    if (err.code === "P2002") {
      return { status: 409, message: "A record with those values already exists" };
    }

    if (err.code === "P2003") {
      return { status: 400, message: "The related record does not exist" };
    }

    if (err.code === "P2025") {
      return { status: 404, message: "Record not found" };
    }

    return { status: 500, message: "Database error" };
  }

  if (CLIENT_ERRORS.has(err?.message)) {
    return { status: 400, message: CLIENT_ERRORS.get(err.message) };
  }

  if (Number.isInteger(err?.status) && err.status >= 400 && err.status < 500) {
    return { status: err.status, message: err.message || "Request error" };
  }

  return { status: 500, message: "Internal server error" };
}

export function notFoundMiddleware(req, res) {
  return res.status(404).send({ message: "Route not found" });
}

export default function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const { status, message } = normalizeError(err);
  const context = `${req.method} ${req.originalUrl}`;

  if (status >= 500) {
    console.error(`[${new Date().toISOString()}] ${context}`, err);
  } else {
    console.warn(`[${new Date().toISOString()}] ${context}: ${message}`);
  }

  return res.status(status).send({ message });
}
