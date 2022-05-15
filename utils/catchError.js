const catchError = () => {
    let errorMessage;

    if (error.response) {
        // if the request was made and the server not responded with a status code in the range of 2xx

        errorMessage = error.response.data
        console.error(errorMessage)

    } else if (error.request) {
        // if the request was made  and no response was recevied from server
        errorMessage = error.request

        console.error(errorMessage)

    } else {
        // if something else happen while make the request

        errorMessage = error.message
        console.error(errorMessage);
    }
    return errorMessage
};

export default catchError;