const { isEmpty } = require('lodash/lang');
const { pbkdf } = require('../../util');
const BaseService =  require("./baseService");
const Usr = require('../dao/usr/base');

class UsrService extends BaseService {
    constructor (){
        super( Usr );
        super.sole = 'phone';   
    }
    insert ( options ) {    
        return new Promise(( resolve, reject ) => {
            this.exist( options )
                .then( data => {
                    if( data ){
                        return resolve({
                            exist: true,
                            value: data.dataValues
                        });
                    }
                    //pbkdf加密, 32位随机salt
                    pbkdf( options.certificate ).then(({ key, salt }) => {
                        options.certificate = key;
                        options.salt = salt;
                        Usr.create( options ).then( data => {        
                            resolve({
                                exist: false,
                                value: data.dataValues
                            });
                        }).catch( reject );
                    }).catch( reject );
                });
        });
    }
}

module.exports = new UsrService();