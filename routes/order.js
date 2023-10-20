var express = require('express');
var router = express.Router();
var db = require('../db');

//주문등록 페이지 이동
router.get("/insert", function(req, res){
    const cart=req.query.cart;
    //console.log('..............', cart);
    const sql='select * from view_cart where cid in (?)';
    db.get().query(sql, [cart], function(err, rows){
        res.render('index', {title:'주문하기', pageName:'users/order.ejs', 
            cart:JSON.stringify(rows)});
    })
});

module.exports = router;