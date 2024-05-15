class ApiError extends Error{
  constructor(message="Something went wrong",error=[],statusCode,stack=""){
    super(message)
    this.message= message
    this.error =error
    this.statusCode = statusCode
    this.success=false
    if(stack){
      this.stack=stack
    }else{
      Error.captureStackTrace(this,this.constructor)
    }
  }
}
export {ApiError}
