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
});

//주문자정보 입력
router.post("/purchase/insert", function(req, res){
    const uid=req.body.uid;
    const rname=req.body.rname;
    const rphone=req.body.rphone;
    const raddress1=req.body.raddress1;
    const raddress2=req.body.raddress2;
    const sum=req.body.sum;
    console.log(uid, rname, rphone, raddress1, raddress2, sum);
    let sql='insert into purchase(uid,rname,rphone,raddress1,raddress2,sum) values(?,?,?,?,?,?)';
    db.get().query(sql,[uid,rname,rphone,raddress1,raddress2,sum], function(err){
        console.log('.............err1', err);
        sql='select last_insert_id() last';
        db.get().query(sql, function(err, rows){
            console.log('.................err2', err);
            res.send(rows[0].last.toString());
        });
    });
});

module.exports = router;