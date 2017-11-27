const { uuid, pbkdf } = require('../../util');
const usr = require('../service/usr');
const redis = require('../../db/redis');

module.exports = app => {
    //添加一个用户
    app.post('/usr/add', ( req, res ) => {
        usr.insert ({
            uid: uuid( 32 ),
            userRole: req.body.userRole || 1,
            nickname: req.body.nickname,
            phone: req.body.phone,
            avatar: req.body.avatar,
            integral: req.body.integral || 0,
            certificate: req.body.certificate
        })
        .then( res.jsonSucc )
        .catch( res.jsonDBE );
    });

    /**
     * 登陆, 用户名,密码
     */
    app.post('/usr/signin', ( req, res ) => {
        let phone = req.body.phone,
            certificate = req.body.certificate;

        if( !phone || !certificate ) 
            return res.jsonFail({ 'message' : 'params error' });
        
        //判断用户是否存在
        usr.exist({ phone })
            .then( data => {
                //不存在此用户
                if( !data ) return res.jsonFail({ 'message': 'usr not existed' });
                let v = data.dataValues;
                let uid = v.uid;
                let _certificate = v.certificate;
                let _salt = v.salt;
                //判断用户名密码是否匹配
                //将从数据库取出的盐+传来的密码 使用pbkdf加密, 与数据库保存的密码匹配
                pbkdf( certificate, _salt )
                    .then(({ key }) => {
                        //用户名or密码错误
                        if( key !== _certificate ){
                            return res.jsonFail({ 'message': 'usr or pwd error' });
                        }
                        //生成32位token
                        let token = uuid( 32 );
                        //将token写入redis
                        redis.setex( uid, token );
                        //脱敏
                        delete v.salt;
                        delete v.certificate;
                        delete v.id;
                        delete v.userRole;                
                        //返回token给客户端                
                        res.jsonSucc(Object.assign( v, {
                            token
                        }));
                    })
                    .catch( res.jsonDBE );
            })
            .catch( res.jsonDBE );
    });

    //注册
    app.post('/usr/signup', ( req, res ) => {
        //
    });

    //忘记密码
    app.post('/usr/forget', ( req, res ) => {
        //
    });

    //登出
    app.post('/usr/signout', ( req, res ) => {
        if( !req.body.uid ) return res.jsonFail({ 'message': 'params error' });
        let authToken = req.headers['x-auth-token'];
        if( !authToken ){
            return res.jsonFail({ 'message': 'not login' });
        }
        //删除redis uid对应的token
        redis.get( req.body.uid )
            .then( token => {
                //token不匹配可能过期
                if( authToken !== token ) 
                    return res.jsonFail({ 'message': 'token expired' });

                //匹配成功, 删除对应key
                redis.del( req.body.uid )
                    .then( res.jsonSucc )
                    .catch( res.jsonDBE );
            })
            .catch( res.jsonDBE );
    });
};