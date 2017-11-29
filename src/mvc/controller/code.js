const { uuid, pbkdf } = require('../../util');
const sandbox = require('../../../../sandbox/src/main');

module.exports = app => {
    app.post('/code/run', ( req, res ) => {
    });

    app.post('/code/test', ( req, res ) => {
        let code = req.body.code;
        let cases = req.body.cases; 
        let language = req.body.language;

        if( !code ){    
            return res.jsonFail('params missing: code');
        } else if( !cases ){    
            return res.jsonFail('params missing: cases');   
        } else if( !language ){ 
            return res.jsonFail('params missing: language');
        }           

        sandbox.run( code, {            
            "language": language,       
            "cases": cases  
        }).then( data => {  
            res.jsonSucc( data );
        }).catch( e => {
            res.jsonFail( e );
        });
    });

    app.post('/code/exec', ( req, res ) => {
    });
};