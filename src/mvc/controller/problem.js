const { uuid, pbkdf, parasmDetect } = require('../../util');
const problem = require('../service/problem');

module.exports = app => {
    /**
     * 添加一个题目
     * @param { string } title 
     * @param { string } description
     * @param { string } language
     * @param { string } solution
     * @param { string } cases
     * @param { boolean } is_public      
     */ 
    app.post('/problem/add', ( req, res ) => {
        var detected = parasmDetect( problem.scheme(), req.body );
        if( detected.failure ){
            return res.jsonFail( detected.message );
        }
        problem.insert({
            title: req.body.title,
            description: req.body.description,
            language: req.body.language,
            solution: req.body.solution,
            cases: req.body.cases,
            is_public: req.body.is_public
        })
        .then( res.jsonSucc )
        .catch( res.jsonDBE )
    });

    /**
     * 更新一个题目内容
     * @param { string } title 
     * @param { string } description
     * @param { string } language
     * @param { string } solution
     * @param { string } cases
     * @param { boolean } is_public
     */
    app.post('/problem/update', ( req, res ) => {
    });

    /**
     * 查看一个题目
     * @param { string } id
     */
    app.post('/problem/view', ( req, res ) => {
    });
};