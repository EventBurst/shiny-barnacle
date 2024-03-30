function asyncHandler(func) {
  return function (req, res, next) {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
}
export { asyncHandler };
