import jwt from "jsonwebtoken";

export default function AuthMiddleWare(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      message: "Missing authorization token",
    });
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).send({
      message: "Invalid authorization header",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).send({
      message: err.message,
    });
  }
}
