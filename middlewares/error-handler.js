const errorHandler = (err, req, res, next) => {
  let status, message
  // console.log(err.name)
  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeDatabaseError":
      status = 400;
      message = err;
      break
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token"
      break;
    case "AUTHENTICATION_FAILED":
      status = 401;
      message = "Invalid token";
      break;
    case `FORBIDDEN`:
      status = 403;
      message = "You are not authorized";
      break;
    case `NOT_FOUND`:
      status = 404;
      message = "Data not found";
      break;
    case `INVALID_USER`:
      status = 401;
      message = "Invalid email/password";
      break;
    default:
      // console.log(err)
      status = 500;
      message = "Internal server error";
      break;
  }

  res.status(status).json({ message })
}

module.exports = errorHandler