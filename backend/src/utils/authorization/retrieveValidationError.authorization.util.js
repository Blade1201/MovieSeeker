const retrieveValidationError = (errors) => {
    const nestedErrors = errors[0]["nestedErrors"];

    return retrieveReasonAndParam(nestedErrors ? nestedErrors[0] : errors[0]);
}

const retrieveReasonAndParam = (error) => {
    return {
        reason: error["msg"],
        param: error["param"]
    }
}

export default retrieveValidationError;