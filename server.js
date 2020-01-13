const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const CustomerModel = require('./client/src/models/CustomerModel')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
/* MySQL 구현
const mysql = require('mysql');
const connection = mysql.createConnection(
    {host: conf.host, user: conf.user, password: conf.password, port: conf.port, database: conf.database}
)
connection.connect();
const multer = require('multer');
const upload = multer({dest: './upload'})
app.get('/api/customers', (req, res) => {
    connection.query("SELECT * FROM CUSTOMER WHERE isDeleted = 0", (err, rows, fields) => {
        res.send(rows);
    });
});
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
*/

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/management', {useMongoClient : true})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));


const CustomerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    birthday: {type: String, required: true},
    gender: {type: String, required: true},
    job: {type: String, required: true},
    completed: {type: BigInt, default: false}
    },
    {
        timestamps: true
    },
    {
        collection: 'customer'
    }
);
const Customer = mongoose.model('customer',CustomerSchema);

app.get('/api/customers', (req, res, next) => {
    Customer.find({}, function (error, customer) {
        if(error) {
            return res.json(error);
        }
        return res.json(customer);
    })
})

app.post('/api/customers',upload.single('image'),(req,res) => {
    var name = req.body.name;
    var image = req.file.filename;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var job = req.body.job;
    var customer = Customer({
        name : name,
        image : image,
        birthday : birthday,
        gender : gender,
        job : job
    })
    customer.save(function (err) {
        if (err) {
            return res.json(err);
        }
        return res.send("Successfully Created");
    })
})
app.listen(port, () => console.log(`Listening on port ${port}`));