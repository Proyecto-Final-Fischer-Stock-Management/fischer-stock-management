import jwt from "jsonwebtoken";

export default function AuthMiddleWare(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(
      Object.assign(new Error("Missing authorization token"), { status: 401 }),
    );
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(
      Object.assign(new Error("Invalid authorization header"), { status: 401 }),
    );
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    return next(err);
  }
}
