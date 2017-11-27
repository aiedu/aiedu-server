const Sequelize = require('sequelize');
const db = require("../../../db");

module.exports = db.define('usr', {
    id: {
        type: Sequelize.BIGINT(10), 
        autoIncrement:true, 
        primaryKey : true, 
        unique : true
    },
    uid: {
        type: Sequelize.STRING,
        comment: 'uid',
        allowNull: false
    },
    userRole: {
        type: Sequelize.STRING,
        comment: "账号类型 1.普通用户 2.虚拟用户 3.内部账户",
        allowNull: false
    },
    //昵称唯一
    nickname: {
        type: Sequelize.STRING,
        comment: "昵称",
        allowNull: false
    },
    //手机号唯一
    phone: {    
        type: Sequelize.STRING,
        comment: "手机号",
        allowNull: false
    },
    certificate: {
        type: Sequelize.STRING,
        comment: "密码或登陆凭证",
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        comment: "密码盐值",
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        comment: "头像",
        allowNull: false
    },
    integral: {
        type: Sequelize.INTEGER,    
        comment: "积分",
        allowNull: false
    }
}, {
    //时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
    timestamps: true,   
    // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    paranoid: true,  
    // 不使用驼峰式命令规则，这样会在使用下划线分隔
    // 这样 updatedAt 的字段名会是 updated_at
    underscored: true
});