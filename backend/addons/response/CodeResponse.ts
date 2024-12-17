export const CODE_RESPONSE = [
    {
        CODE: 200,
        STATUS: true,
        DESCRIPTION: 'Ok',
        MESSAGE: 'Successful request'
    },
    {
        CODE: 201,
        STATUS: true,
        DESCRIPTION: 'Created',
        MESSAGE: 'Record created successfully'
    },
    {
        CODE: 400,
        STATUS: false,
        DESCRIPTION: 'Bad Request',
        MESSAGE: 'Error requesting the resource'
    },
    {
        CODE: 401,
        STATUS: false,
        DESCRIPTION: 'Unauthorized',
        MESSAGE: 'Authentication is required to access this resource'
    },
    {
        CODE: 402,
        STATUS: false,
        DESCRIPTION: 'Payment Required',
        MESSAGE: 'The payment is required'
    },
    {
        CODE: 403,
        STATUS: false,
        DESCRIPTION: 'Forbidden',
        MESSAGE:
            'You do not have the necessary permissions to access this resource'
    },
    {
        CODE: 404,
        STATUS: false,
        DESCRIPTION: 'Not found',
        MESSAGE: 'Resource not found'
    },
    {
        CODE: 500,
        STATUS: false,
        DESCRIPTION: 'Internal Server Error',
        MESSAGE: 'Internal Server Error'
    },
    {
        CODE: 502,
        STATUS: false,
        DESCRIPTION: 'Bad Gateway',
        MESSAGE: 'Gateway no response'
    },
    {
        CODE: 503,
        STATUS: false,
        DESCRIPTION: 'Service Unavailable',
        MESSAGE: 'The server is not ready to handle your request'
    }
];
