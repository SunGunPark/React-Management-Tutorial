import React from 'react';
import Customer from './components/Customer'
import './App.css';

const customers = [{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '홍길동',
  'birthday' : '951011',
  'gender' : '남자',
  'job' : '대학생'
},
{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '이민수',
  'birthday' : '981225',
  'gender' : '남자',
  'job' : '고등학생'
},
{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '제이나',
  'birthday' : '930817',
  'gender' : '여자',
  'job' : '프로그래머'
},
{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '홍길동',
  'birthday' : '951011',
  'gender' : '남자',
  'job' : '대학생'
}
]
function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })
      }
    </div>
    
  );
}

export default App;
