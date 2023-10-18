var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/list.json', function(req, res){  //테스트 localhot:3000/review/list.json?bid=118
    const bid=req.query.bid;
    const page=parseInt(req.query.page);
    const start=(page-1)*5;
    const sql='select * from review where bid=? order by rid desc limit ?, 5';
    db.get().query(sql, [bid, start], function(err, rows){
        res.send(rows);
    });
});

router.get("/count", function(req, res){ //테스트 localhost:3000/review/count?bid=118
    const bid=req.query.bid;
    const sql='select count(*) cnt from review where bid=?';
    db.get().query(sql, [bid], function(err, rows){
        res.send(rows[0].cnt.toString());
    });
});

module.exports = router;