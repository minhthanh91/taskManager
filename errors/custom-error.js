class CustomAPIError extends Error {
    constructor(message,statusCode){
        super(message);         
        // invoke a construction of the parent class, with passing value of "message"
        // and access to all the properties and methods of the parent
        this.statusCode = statusCode;
    }
}

const createCustomError = (msg, statusCode)=>{
    return new CustomAPIError(msg, statusCode);
}

module.exports = {createCustomError, CustomAPIError};