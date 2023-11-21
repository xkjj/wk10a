const express = require('express');
const app = express();
const mysql = require('mysql2');


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'kjarosz02',
    port: '3306',
});

conn.connect((err)=>{
    if(err) return console.log(err.message);
    console.log("connected to local mysql db");
});

app.get('/',  (req, res) => { 
        res.send(`<h2>Admin Menu</h2> 
                  <p>
                   <a href='/manage/edit'>manage employees</a>
                  </p>`);
});



app.get('/manage/edit',  (req, res) => { 

    let peoplesql = `SELECT * FROM employees`

    conn.query(peoplesql, (err, datarows) => {

        if (err) throw err;

        res.render('editpeople', {emplyees: datarows});
    });

});

app.get('/manage/peopleedit',  (req, res) => { 

    let id = req.query.eid;
    let peoplesql = `SELECT * FROM employees WHERE id = ${id}`

    conn.query(peoplesql, (err, rows) => {

        if (err) throw err;

        res.render('eedit', {emplyee: rows});

    });

});

app.post('/manage/peopleedit',  (req, res) => { 

    let job_update = req.body.job_field;
    let id_update = req.body.id_field;
    let updatesql = `UPDATE employees SET job_details = '${job_update}'
    
                WHERE id = ${id_update};`;

    conn.query(updatesql, (err, result) => {

        if (err) throw err;
            
        res.send(`Updated employee details`);
            
 });

});


app.listen(3000, () => {
    console.log(`Server Running at port 3000`);
});