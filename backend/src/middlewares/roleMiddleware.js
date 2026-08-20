export function RoleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).send({
        message: "Forbidden",
      });
    }

    next();
  };
}
