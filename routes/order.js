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
    //console.log(uid, rname, rphone, raddress1, raddress2, sum);
    let sql='insert into purchase(uid,rname,rphone,raddress1,raddress2,sum) values(?,?,?,?,?,?)';
    db.get().query(sql,[uid,rname,rphone,raddress1,raddress2,sum], function(err){
        //console.log('.............err1', err);
        sql='select last_insert_id() last';
        db.get().query(sql, function(err, rows){
            //console.log('.................err2', err);
            res.send(rows[0].last.toString());
        });
    });
});


//주문상품등록
router.post('/book/insert', function(req, res){
    const pid=req.body.pid;
    const bid=req.body.bid;
    const qnt=req.body.qnt;
    const price=req.body.price;
    const cid=req.body.cid;
    //console.log(pid, bid, qnt, price, cid);
    let sql='insert into orders(pid,bid,qnt,price) values(?,?,?,?)';
    db.get().query(sql,[pid,bid,qnt,price],function(err){
        if(err) console.log('주문상품등록오류:', err);
        sql='delete from cart where cid=?';
        db.get().query(sql, [cid], function(err){
            res.sendStatus(200);
        });
    });
});

//주문목록 페이지이동
router.get('/', function(req, res){
    res.render('index', {title:'주문목록', pageName:'order/list.ejs'})
});

//주문목록.json
router.get('/list.json', function(req, res){ //localhost:3000/order/list.json?uid=blue
    const uid=req.query.uid;
    const sql='select * from view_purchase where uid=?';
    db.get().query(sql, [uid], function(err, rows){
        res.send(rows);
    });
});

//주문상품목록.json
router.get("/book.json", function(req, res){//localhost:3000/order/book.json?pid=15
    const pid=req.query.pid;
    let sql='select * from view_orders where pid=?';
    db.get().query(sql, [pid], function(err, rows){
        const books=rows;
        sql='select * from view_purchase where pid=?';
        db.get().query(sql, [pid], function(err, rows){
            res.send({books, info:rows[0]});
        });
    });
});

module.exports = router;