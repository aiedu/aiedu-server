const redis = require("redis");
const chalk = require("chalk");
const client = redis.createClient();

client.on("ready", data => {
    console.log(chalk.green("redis ready"));
});

client.on("error", err => {
    console.error("Redis Error " + err);
});

module.exports = {
    set ( key, value ){
        client.set( key, value, redis.print );
    },
    setex ( key, value, timestamp = 7 * 24 * 60 * 60 ){
        //默认7天过期
        client.set( key, value, 'EX', timestamp);
    },  
    get ( key ){
        return new Promise(( resolve, reject ) => {
            client.get( key, ( err, reply ) => {
                if( err ) return reject( err );
                return resolve( reply );
            });
        });
    },
    del ( key ){
        return new Promise(( resolve, reject ) => {
            client.del( key, ( err, reply ) => {
                if( err ) return reject( err );
                return resolve( reply );
            });
        });
    }
}
