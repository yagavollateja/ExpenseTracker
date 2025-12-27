// const errorHandler = (error,req,res) =>{
//     if(error){
//         if(error.message){
//             res.status(400).json({
//                 status:"failed",
//                 error:error.message
//             });
//         }else{
//             res.status(400).json({
//                 status:"failed",
//                 error:error
//             });
//         }

//     }else{
//         next();
//     }
// }
// module.exports = errorHandler;
// errorHandler.js

// CRITICAL: Must have 4 arguments in this order!
const errorHandler = (error, req, res, next) => {
    // If an error exists (which it must, for this function to be called)
    if (error) {
        // Determine the status code. Default to 500 for unhandled errors.
        // If you're using a custom error class (like suggested before), 
        // you can extract its statusCode here: error.statusCode || 400
        const statusCode = error.statusCode || 400; 

        // Get the error message. If it's a thrown string, it will be 'error'.
        // If it's a proper Error object, use error.message.
        const errorMessage = error.message || error.toString();

        // Send the response
        res.status(statusCode).json({
            status: "failed",
            error: errorMessage,
        });
        
        // Return here to prevent execution from continuing, though Express usually stops.
        return;
    }
    
    // An error handler should almost never reach this point.
    // If it did, it means it was mistakenly called as a normal middleware.
    // To satisfy the linter/pattern, you can just call next() if error is null/undefined.
    // However, it's best to assume this function is ONLY called on an error.
    next();
};

module.exports = errorHandler;