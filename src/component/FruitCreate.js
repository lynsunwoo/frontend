import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../AlertContext';

function FruitCreate() {
  //상태값 관리
  const [form, setForm] = useState({
    name:'',
    price:'',
    color:'',
    country:''
  });

  const navigate = useNavigate();

  //카운트 상태값 관리
  // const { setFruitsCount } = useContext(AlertContext)

  //입력값 변경시
  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //등록하기 버튼 클릭시 호출되는 함수 => 서버로 값 전달 (백앤드)
  const handleSubmit = (e) =>{
    e.preventDefault();

    axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/fruit', form)
    .then(()=>{
      alert('상품이 등록 되었습니다.');
      // setFruitsCount( count => count + 1 )
      navigate('/fruit'); //상품 등록완료 후 fruit페이지로 이동
    })
    .catch(err=> console.log(err));
  };

  return (
    <main>
      <section className='create'>
        <h2>FruitCreate</h2>

        <form onSubmit={handleSubmit} className="form_box">
          <p className="form_p">
            <label>상품명</label>
            <input 
            type="text"
            name='name'
            value={form.name}
            onChange={handleChange}
            required
            />
          </p>

          <p className="form_p">
            <label>가격 </label>
            <input
            type="number" 
            name='price'
            value={form.price}
            onChange={handleChange}
            required
            />
          </p>

          <p className="form_p">
            <label>색상 </label>
            <input 
            type='text'
            name='color'
            value={form.color}
            onChange={handleChange}
            required
            />
          </p>

          <p className="form_p">
            <label>원산지 </label>
            <input 
            type='text'
            name='country'
            value={form.country}
            onChange={handleChange}
            required
            />
          </p>

          <button type='submit'>상품등록하기</button>
        </form>
      </section>
      
    </main>
  )
}


export default FruitCreate;
