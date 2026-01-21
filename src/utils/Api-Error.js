class ApiError extends Error{
    constructor(statusCode,message="Something went wrong",errors=[],stack=""){
      //stack keeps track of the line on which the error will occur
      super(message);
      this.statusCode = statusCode; // HTTP error code (400, 404, 500, etc.)
      this.data = null; // usually error me data null hota hai
      this.message = message; // error ka main message
      this.success = false; // error hamesha false hota hai
      this.errors = errors; // multiple errors ka array (useful in validation)
      //stack is not always available.
      //so we need to use if-else condition.

      if(stack){
        this.stack=stack
      }else{
        Error.captureStackTrace(this,this.constructor);
      }
    }
}
export{ApiError};