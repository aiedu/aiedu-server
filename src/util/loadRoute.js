const path = require("path");
const fs = require("fs-extra");
const walkSync = require('walk-sync');
const bodyParser = require('body-parser');
const resolve = p => path.resolve( __dirname, p );
const responseExtend = require("./extend/response");

module.exports = function ( app ){
    // for parsing application/json
    app.use(bodyParser.json());     
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(responseExtend);
    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        next(); 
    });
    var routePath = resolve( '../mvc/controller' );
    var files = walkSync( routePath );
    files.forEach( f => {
        (require(path.resolve( routePath, f )))( app );
    });
};  