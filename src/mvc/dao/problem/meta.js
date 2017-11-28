const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.BIGINT(10), 
        autoIncrement:true, 
        primaryKey : true, 
        unique : true
    },
    title: {
        type: Sequelize.STRING,
        comment: "标题",
        allowNull: false
    },
    description: {    
        type: Sequelize.STRING,
        comment: "题目描述",
        allowNull: false
    },
    language: {
        type: Sequelize.STRING,    
        comment: "语言",
        allowNull: false
    },
    solution: {
        type: Sequelize.STRING,
        comment: "正确答案",
        allowNull: false
    },
    cases: {
        type: Sequelize.STRING,
        comment: "测试用例",
        allowNull: false
    },
    is_public: {
        type: Sequelize.BOOLEAN,
        comment: "是否公有",
        allowNull: false
    }
}