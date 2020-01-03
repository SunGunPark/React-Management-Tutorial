const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '951011',
            'gender': '남자',
            'job': '대학생'
        }, {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '이민수',
            'birthday': '981225',
            'gender': '남자',
            'job': '고등학생'
        }, {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '제이나',
            'birthday': '930817',
            'gender': '여자',
            'job': '프로그래머'
        }, {
            'id': 4,
            'image': 'https://placeimg.com/64/64/4',
            'name': '가로쉬',
            'birthday': '850101',
            'gender': '남자',
            'job': '전사'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));