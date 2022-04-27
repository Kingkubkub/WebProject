const express = require('express') // เรียกใช้ Express
const mysql = require('mysql') // เรียกใช้ mysql
const cors = require('cors')
const { query } = require('express')
const port1 = 3015
const db = mysql.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล

  // host: '119.59.100.61',
  // user: 'stock',
  // password: '12345678',
  // database: 'stockk'
  host: 'localhost',
  user: 'root',
  password: 'puckgonmnarootyou475time',
  database: 'stockk'
})

db.connect() // เชื่อมต่อฐานข้อมูล

const app = require('express')(); // สร้าง Object เก็บไว้ในตัวแปร app เพื่อนำไปใช้งาน
//Select Data
app.use(cors())
app.get('/exchange', (req, res) => {   // Router เวลาเรียกใช้งาน
  let sql = 'SELECT * FROM stockk.exchange_rate_usd'  // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var selectpolicys = 'SELECT DataPolicyRate,Date FROM stockk.Policy_RateBot'
var anspolicys = selectpolicys 
app.use(cors())
app.get('/policy1', (req, res) => {   // Router เวลาเรียกใช้งาน
  let sql = anspolicys // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var selectworld1 = 'SELECT open-close as ABC,Name,Open,Close FROM stockk.stockworld where Date = (select max(date) from stockk.stockworld) AND open IS NOT NULL && close IS NOT NULL'
var answorld = selectworld1 
app.use(cors())
app.get('/world', (req, res) => {   // Router เวลาเรียกใช้งาน
  let sql = answorld// คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
var a = 'SELECT * FROM stockk.stockbasic_information where Name = '
app.use(cors())
app.get('/information/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT * FROM stockk.stockbasic_information where Name = ' + uu + req.params.id + yy
  let sql = a // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/
// SELECT NAV_Daily.proj_id, proj_name_th,NAV_Daily.last_val ,NAV_Daily.nav_date FROM NAV_Daily JOIN list_of_mutual_fund ON list_of_mutual_fund.proj_id  = NAV_Daily.proj_id where nav_date = "2020-11-27" order by net_asset DESC LIMIT 5
// Select Data nav1
app.use(cors())
app.get('/navs', (req, res) => {   // Router เวลาเรียกใช้งาน
  let sql = 'SELECT NAV_Daily.proj_id, proj_name_th,NAV_Daily.last_val ,NAV_Daily.nav_date FROM NAV_Daily JOIN list_of_mutual_fund ON list_of_mutual_fund.proj_id  = NAV_Daily.proj_id where nav_date = (select max(nav_date) from NAV_Daily ) order by last_val DESC LIMIT 5'
  // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/

// var uu = '"'
// var yy = '"'
// var kk1 = ')'
// // var a = 'SELECT * FROM stockk.stockfactsheet where Name = '
// app.use(cors())
// app.get('/stockfactsheet/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
//   var a = 'select * from stockk.stockfactsheet where name = ' + uu + req.params.id + yy
//   var b = 'and date = (select max(date) from stockk.stockfactsheet where name=' + uu + req.params.id + yy + kk1
//   var c = a+b
//   let sql = c // คำสั่ง sql
//   let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
//     if (err) throw err  // ดัก error
//     console.log(results) // แสดงผล บน Console 
//     res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
//   })
// })
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
app.use(cors())
app.get('/stockful/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT Date,Open,High,Low,Close,Volume FROM stockk.stock where Name = ' + uu + req.params.id + yy
  let sql = a // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})


/*------------------------------------------------------------------------*/
var new1 = '"'
var new3 = ')'
app.use(cors())
app.get('/stocknews/:id/:id1', (req, res) => {   // Router เวลาเรียกใช้งาน
  var newsday = 'SELECT * FROM stockk.stocknews where (Date = ' + uu + req.params.id + new1 + new3
  var newstag = 'AND (Tag1 = ' + uu + req.params.id1 + '" OR Tag2 ="' + req.params.id1 + '" OR Tag3 = "' + req.params.id1 + '" OR Tag4 ="' + req.params.id1 + '" OR Tag5 = "' + req.params.id1 + '"' + " OR Tag1 = 'หุ้นไทย' OR Tag2 = 'หุ้นไทย' OR Tag3 = 'หุ้นไทย' OR Tag4 = 'หุ้นไทย' OR Tag5 = 'หุ้นไทย'  )"
  let sql =  newsday+newstag// คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/

app.use(cors())
app.get('/stocknews', (req, res) => {   // Router เวลาเรียกใช้งาน
  let sql = 'SELECT * FROM stockk.stocknews order by stockk.stocknews.Date desc limit 25'  // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})


/*------------------------------------------------------------------------*/
var uu1 = '"'
var yy1 = '"'
var yy2 = ')'
app.use(cors())
app.get('/stocktop10/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT * FROM stockk.stocktop10 where Name =' + uu1 + req.params.id + yy1 
  // var b = 'OR Namepeople  LIKE ' + uu1 + req.params.id + yy1 
  var c = 'and date = (SELECT max(date) FROM stockk.stocktop10 where name=' + uu1 + req.params.id + yy1 + yy2
  var d = 'ORDER BY stockk.stocktop10.Percent DESC'
  var e = a+c+d
  let sql = e // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/
var uu1 = '"'
var yy1 = '"'
var yy2 = ')'
app.use(cors())
app.get('/stocktop10people/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT * FROM stockk.stocktop10 where Namepeople =' + uu1 + req.params.id + yy1 
  // var b = 'OR Namepeople  LIKE ' + uu1 + req.params.id + yy1 
  var c = 'and date = (SELECT max(date) FROM stockk.stocktop10 where Namepeople=' + uu1 + req.params.id + yy1 + yy2
  var d = 'ORDER BY stockk.stocktop10.Percent DESC'
  var e = a+c+d
  let sql = e // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
var a = 'SELECT * FROM stockk.stockdetail where Name  = '
app.use(cors())
app.get('/detail/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT * FROM stockk.stockdetail where Name = ' + uu + req.params.id + yy
  let sql = a // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
var a = 'SELECT * FROM stockk.stockcost where Name = '
app.use(cors())
app.get('/stockcost/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT * FROM stockk.stockcost1 where Name = ' + uu + req.params.id + yy
  let sql = a // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
app.use(cors())
app.get('/stockcostyear/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var stockcostyear = 'SELECT * FROM stockk.stockcostyear where Name = ' + uu + req.params.id + yy
  let sql = stockcostyear // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
app.use(cors())
app.get('/stockcostquarter/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var stockcostquarter = 'SELECT * FROM stockk.stockcostquarter where Name = ' + uu + req.params.id + yy
  let sql = stockcostquarter // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
var a = 'SELECT * FROM stockk.stocknews where Tag1 = '
app.use(cors())
app.get('/stocknewstag/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var a = 'SELECT * FROM stockk.stocknews where Tag1 = ' + uu + req.params.id + '" OR Tag2  LIKE "%' + req.params.id + '" OR Tag3  LIKE "%' + req.params.id + '" OR Tag4  LIKE "%' + req.params.id + '" OR Tag5  LIKE "%' + req.params.id + '%" ORDER BY Date DESC' ;
  let sql = a // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
/*ข่าวที่มีผลกับหุ้น */
var new1 = '"'
var new3 = ')'
app.use(cors())
app.get('/stocknewstag2/:id/:id1', (req, res) => {   // Router เวลาเรียกใช้งาน
  var newsday = 'SELECT * FROM stockk.stocknews where (Date = ' + uu + req.params.id + new1 + new3
  var newstag = 'AND (Tag1 = ' + uu + req.params.id1 + '" OR Tag2 ="' + req.params.id1 + '" OR Tag3 = "' + req.params.id1 + '" OR Tag4 ="' + req.params.id1 + '" OR Tag5 = "' + req.params.id1 + '"' + ")"
  let sql =  newsday+newstag// คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/

// Select Data
var selectstock1 = 'SELECT open-close as ABC,name,open,close,Date FROM stockk.stock where Date = (select max(date) from stockk.stock)  AND open IS NOT NULL && close IS NOT NULL order by open-close DESC LIMIT 5'
var ansstock = selectstock1 
app.use(cors())
app.get('/stock', (req, res) => {   // Router เวลาเรียกใช้งาน
  let sql = ansstock // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

app.use(cors())
app.get('/timeimfor', (req, res) => {   // Router เวลาเรียกใช้งาน
  var timeimfor = 'SELECT Date FROM stockk.stocktop10 where date = (select max(date) from stockk.stocktop10 ) order by Date desc LIMIT 1 '
  let sql = timeimfor // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})

/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
app.use(cors())
app.get('/eventcovid', (req, res) => {   // Router เวลาเรียกใช้งาน
  var eventcovid = 'select a.Name, ((point_a - point_b)/point_b)*100 as point_diff from (select Name, Close as point_a from stockk.stock where Date =' + yy +'2021-02-02'+ uu + ' )  as a join (select Name, Close as point_b from stockk.stock where Date =' + yy + '2020-11-02' + uu + ' )  as b on a.Name = b.Name order by point_diff desc limit 10'
  let sql = eventcovid // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/

var new1 = '"'
var new3 = ')'
app.use(cors())
app.get('/eventcovid3/:id/:id1', (req, res) => {   // Router เวลาเรียกใช้งาน
  var eventcovid = 'select a.Name,point_a,point_b, ((point_a - point_b)/point_b)*100 as point_diff from (select Name, Close as point_a from stockk.stock where Date =' + new1 + req.params.id + new1 + ' )  as a join (select Name, Close as point_b from stockk.stock where Date =' + new1 + req.params.id1  + new1 + ' )  as b on a.Name = b.Name order by point_diff desc limit 10'
  let sql = eventcovid // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
app.use(cors())
app.get('/daynowstock', (req, res) => {   // Router เวลาเรียกใช้งาน
  var daynowstock = 'SELECT Date FROM stockk.stock where date = (select max(date) from stockk.stock ) order by Date desc LIMIT 1'
  let sql = daynowstock // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
app.use(cors())
app.get('/daynowworld', (req, res) => {   // Router เวลาเรียกใช้งาน
  var daynowworld = 'SELECT Date FROM stockk.stockworld where date = (select max(date) from stockk.stockworld ) order by Date desc LIMIT 1'
  let sql = daynowworld // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
app.use(cors())
app.get('/daynownav', (req, res) => {   // Router เวลาเรียกใช้งาน
  var daynownav = 'SELECT nav_date FROM stockk.NAV_Daily where nav_date = (select max(nav_date) from stockk.NAV_Daily ) order by nav_date desc LIMIT 1'
  let sql = daynownav // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
app.use(cors())
app.get('/daynowpolicy', (req, res) => {   // Router เวลาเรียกใช้งาน
  var daynowpolicy = 'SELECT Date FROM stockk.Policy_RateBot where date = (select max(date) from stockk.Policy_RateBot ) order by Date desc LIMIT 1'
  let sql = daynowpolicy // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
app.use(cors())
app.get('/nameth', (req, res) => {   // Router เวลาเรียกใช้งาน
  var nameth = 'SELECT Unique_id,name_th  FROM stockk.list_of_asset_management order by name_th'
  let sql = nameth // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/

var uu = '"'
var yy = '"'
var new1 = '"'
app.use(cors())
app.get('/proj/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var proj = 'SELECT DISTINCT NAV_Daily.proj_id , list_of_mutual_fund.proj_name_th FROM NAV_Daily INNER JOIN  list_of_mutual_fund ON NAV_Daily.proj_id = list_of_mutual_fund.proj_id where NAV_Daily.unique_id = '+ new1 + req.params.id + new1 +' order by list_of_mutual_fund.proj_name_th'
  let sql = proj // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
var new1 = '"'
app.use(cors())
app.get('/navgrap/:id', (req, res) => {   // Router เวลาเรียกใช้งาน
  var proj = 'SELECT nav_date,last_val FROM stockk.NAV_Daily where proj_id = '+ new1 + req.params.id + new1 +''
  let sql = proj // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
var new1 = '"'
app.use(cors())
app.get('/daytop/:id/:id1', (req, res) => {   // Router เวลาเรียกใช้งาน
  var proj = 'SELECT * FROM stockk.stocktop10 where Name = '+ new1 + req.params.id + new1 +' and Date = '+ new1 + req.params.id1 + new1 +''
  let sql = proj // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
var uu = '"'
var yy = '"'
var new1 = '"'
app.use(cors())
app.get('/topdialog/:id/:id1', (req, res) => {   // Router เวลาเรียกใช้งาน
  var proj = 'SELECT * FROM stockk.stocktop10 where  Namepeople = '+ new1 + req.params.id + new1 +' and Name = '+ new1 + req.params.id1 + new1 +''
  let sql = proj // คำสั่ง sql
  let query = db.query(sql, (err, results, fields) => { // สั่ง Query คำสั่ง sql
    if (err) throw err  // ดัก error
    console.log(results) // แสดงผล บน Console 
    res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
  })
})
/*------------------------------------------------------------------------*/
app.listen('3015', () => {     // 
  console.log('start port 3015')
})

/*------------------------------------------------------------------------*/
