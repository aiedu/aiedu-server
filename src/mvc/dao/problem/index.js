const Sequelize = require('sequelize');
const db = require("../../../db");
const meta = require("./meta");

module.exports = db.define('problem', meta, {
    //时间戳，启用该配置后会自动添加createdAt、updatedAt两个字段，分别表示创建和更新时间
    timestamps: true,   
    // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    paranoid: true,  
    // 不使用驼峰式命令规则，这样会在使用下划线分隔
    // 这样 updatedAt 的字段名会是 updated_at
    underscored: true
});