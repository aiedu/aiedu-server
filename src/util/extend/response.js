module.exports = ( req, res, next ) => {
    res.jsonSucc = options => {
        return res.status( 200 ).json({
            ack: true,
            status: "success",
            data: options || {}
        });
    }
    res.jsonFail = options => {
        return res.status( 200 ).json({
            ack: true,
            status: "failure",
            data: options || {}
        });
    }
    res.jsonDBE = error => {
        return res.status( 500 ).json({
            ack: true,
            status: "failure",
            message: error.message,
            stack: error.stack
        });
    }
    next();
};