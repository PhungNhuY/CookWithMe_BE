// const ErrorResponse = require("../common/ErrorResponse");
const { mongoEnum } = require("../enums/mongo-error.enum");
const { msgEnum } = require("../enums/message.enum");
const { codeEnum } = require("../enums/status-code.enum");
const { statusEnum } = require("../enums/status.enum");

function errorHandle(err, req, res, next) {
  console.log("-----errorHandle----- " + err.name, err.code);
  console.log(err);
  let error = err;

  // MongoDB bad ObjectID
  if (err.name === mongoEnum.CAST) {
    error.statusCode = codeEnum.NOT_FOUND;
    error.status = statusEnum.FAIL;
    error.message = msgEnum.NOT_FOUND;
  }

  //MongoDB duplicate value key
  if (err.code === mongoEnum.DUPLICATE) {
    error.statusCode = codeEnum.BAD_REQUEST;
    error.status = statusEnum.FAIL;
    // code cần đánh giá, có thể lỗi hoặc không phù hợp
    error.message = `Value '${err.keyValue.name}' ${msgEnum.DUPLICATE_VALUE}`;
    // origin
    // error.message = msgEnum.DUPLICATE_VALUE;
  }

  // MongoDB validation failed
  if (err.name === mongoEnum.VALIDATION) {
    const message = Object.values(err.errors).map((value) => value.message);
    error.statusCode = codeEnum.BAD_REQUEST;
    error.status = statusEnum.FAIL;
    error.message = message;
  }

  res.status(error.statusCode || codeEnum.SERVER_ERROR).json({
    status: error.status || statusEnum.ERROR,
    message: error.message || msgEnum.SERVER_ERROR,
  });
};

module.exports = errorHandle;
