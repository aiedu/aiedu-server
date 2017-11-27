const { isEmpty } = require('lodash/lang');

module.exports = class BaseService {
    constructor ( entity ){
        this.entity = entity;
    }
    set sole ( key ) {
        this.$existKey = key; 
    }
    /**
     * @param { object } options
     * @param { string } options.name
     */
    exist ( options ){
        //默认使用`name`为确认是否唯一的key
        //通过 `super.sole = xx` 可以修改
        var key = this.$existKey || 'name';
        var $where = {};    
        $where[ key ] = options[ key ];
        return this.entity.findOne({
             where: $where
        }); 
    }
    /**
     * @param { object } options 
     */
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
                    this.entity.create( options ).then( data => {        
                        resolve({
                            exist: false,
                            value: data.dataValues
                        });
                    }).catch( reject );
                });
        });
    }
    list ({ offset, limit }){
        return this.entity.findAndCountAll({
            offset,
            limit
        });
    }
    /**
     * 模糊查询语言名
     * 通过名称查询
     * @param { object } options
     * @param { number } options.offset
     * @param { number } options.limit
     * @param { key } options.key
     */
    search ({ offset, limit, key }){
        return this.entity.findAndCountAll({
            offset,
            limit,
            where: {
                name: {
                    $like: `%${key}%`
                }
            }
        });
    }
}