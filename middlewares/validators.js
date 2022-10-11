const { sendResponse }=require("../helpers/utils.js");
const {validationResult} = require("express-validator");
const mongoose  = require("mongoose");

const validators = {};

validators.validate = (validationArray) => async (req, res, next) => {
    await Promise.all(validationArray.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const messages = errors.array().map((error) => error.msg).join("&");

    return sendResponse(res, 422 ,false,null ,{messages}, "validation Error")
}

validators.checkObjectId = (paramId) => {
    if(!mongoose.Types.ObjectId.isValid(paramId)){
        throw new Error("Invalid objectId");
    }
    return true;
}

module.exports = validators;
