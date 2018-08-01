var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');



/* GET home page. */
router.get('/', function(req, res, next) {
// 取得使用者傳來的參數
var memNo=req.session.memNo;
var memName=req.param("memName");
var memEmail=req.param("memEmail");
var memPhone=req.param("memPhone");
var memTitle=req.param("memTitle");
var sGrade=req.param("sGrade");
var memSchool=req.param("memSchool");

  
// 將更改資料
pool.query('UPDATE smember SET memName=?, memEmail=?, memPhone=?, memTitle=?, sGrade=?, memSchool=? where memNo=?', [memName, memEmail, memPhone, memTitle, sGrade, memSchool, memNo], function(err, rows, fields) {
  if (err){						
    res.render('memUpdateFailS', {});     //導向更改失敗頁面
  }else{
        pool.query('select * from smember where memNo=?', [memNo], function(err, results) {
        res.render('memUpdateSuccessS', {memNo:req.session.memNo,memName:req.session.memName,memTitle:req.session.memTitle,data:results});  //導向更改成功頁面
      }); 
    }	
  })
});

module.exports = router;
