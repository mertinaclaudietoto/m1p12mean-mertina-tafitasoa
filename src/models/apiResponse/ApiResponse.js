class ApiResponse {
    constructor(status, message, data = null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
    static success(message, data) {
      return new ApiResponse('success', message, data);
    }
    static error(message, errors = []) {
      return new ApiResponse('error', message, { errors });
    }
  }
  
module.exports = ApiResponse;
  