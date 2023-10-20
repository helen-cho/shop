var express = require('express');
var router = express.Router();
var db = require('../db');

//주문등록 페이지 이동
router.get("/insert", function(req, res){
    const cart=req.query.cart;
    res.render('index', {title:'주문하기', pageName:'users/order.ejs', cart:cart});
});

//주문할 도서목록
router.get("/cart.json", function(req, res){
    const cart=req.query.cart;
    const uid=req.query.uid;
    let sql=`select * from view_cart where cid in (${cart})`; //주문 도서목록
    db.get().query(sql, function(err, rows){
        const order=rows;
        sql='select * from users where uid=?'; //사용자 정보
        db.get().query(sql, [uid], function(err, rows){
            res.send({order, user:rows[0]});
        });
    });
})
module.exports = router;