var express = require('express');
var router = express.Router();
var db = require('../db');

//카트에 도서등록
router.post('/insert', function(req, res){
    const uid=req.body.uid;
    const bid=req.body.bid;

    let sql='select count(*) cnt from cart where uid=? and bid=?';
    db.get().query(sql, [uid, bid], function(err, rows){
        const count=rows[0].cnt;
        if(count==0){ //장바구니에 없으면
            sql='insert into cart(uid, bid) values(?,?)';
            db.get().query(sql, [uid, bid], function(err){
                res.send('0')
            });
        }else{ //장바구이에 있으면
            sql='update cart set qnt=qnt+1 where uid=? and bid=?';
            db.get().query(sql, [uid, bid], function(err){
                res.send('1');
            })
        }
    });
});

module.exports = router;