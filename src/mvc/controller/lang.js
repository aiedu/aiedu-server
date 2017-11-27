const { uuid, pbkdf } = require('../../util');
const usr = require('../service/usr');
const redis = require('../../db/redis');
const langData = require('../../data/lang');

module.exports = app => {
    //添加一个用户
    app.get('/lang', ( req, res ) => {
        let r = {};
        for( let l in langData ){
            if( langData[ l ].enable ){
                r[ l ] = langData[ l ];
            }
        }
        res.jsonSucc( r );
    });
};