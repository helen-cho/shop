var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/list.json', function(req, res){  //테스트 localhot:3000/review/list.json?bid=118
    const bid=req.query.bid;
    const sql='select * from review where bid=? order by rid desc limit 0, 5';
    db.get().query(sql, [bid], function(err, rows){
        res.send(rows);
    });
});

module.exports = router;