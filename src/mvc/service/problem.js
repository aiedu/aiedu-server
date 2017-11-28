const { isEmpty } = require('lodash/lang');
const { extractMeta } = require('../../util');
const BaseService =  require("./baseService");
const Problem = require('../dao/problem');
const meta = require('../dao/problem/meta');

class ProblemService extends BaseService {
    constructor (){
        super( Problem );   
    }   
    scheme (){
        delete meta.id;
        return extractMeta( meta );
    }
    exist ( options ){
        return this.entity.findOne({    
             where: {
                title: options.title,
                language: options.language
             }
        }); 
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
                    Problem.create( options ).then( data => {        
                        resolve({
                            exist: false,
                            value: data.dataValues
                        });
                    }).catch( reject );
                });
        });
    }
}

module.exports = new ProblemService();