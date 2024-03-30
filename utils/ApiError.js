class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    // Custom properties specific to ApiError
    this.statusCode = statusCode;
    this.data = null; // This property is initialized to null
    this.message = message;
    this.success = false;
    this.errors = errors; // This property holds an array of error messages

    // If a stack trace is provided, use it; otherwise, capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
