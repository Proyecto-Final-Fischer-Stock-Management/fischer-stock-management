export function RoleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return next(Object.assign(new Error("Forbidden"), { status: 403 }));
    }

    next();
  };
}
