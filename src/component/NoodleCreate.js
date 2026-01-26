import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { AlertContext } from '../AlertContext';

function NoodleCreate() {

  const [form, setForm] = useState({
    num: '',
    name: '',
    company: '',
    kind: '',
    price: '',
    e_date: ''
  });

  const navigate = useNavigate();

  //카운트 상태 변수 관리
  // const { setNoodleCount } = useContext(AlertContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:9070/noodle`, form)
      .then((res) => {
        alert('상품이 등록 되었습니다.');
        // setNoodleCount( count => count + 1 );
        navigate('/noodle');
      })
      .catch(err => console.log(err));
  }

  return (
    <main>
      <section className='create'>
        <h2>Noodle Create</h2>
        <form onSubmit={handleSubmit} className='form_box'>
          <p className='form_p'>
            <label htmlFor="name">상품명</label>
            <input
              type="text"
              name='name'
              value={form.name}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label htmlFor="companmy">브랜드</label>
            <input
              type="text"
              name='company'
              value={form.company}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label htmlFor="kind">상품종류</label>
            <select
              name="kind"
              id="kind"
              value={form.kind}
              onChange={handleChange}
              required
            >
              <option value="">종류를 선택하세요</option>
              <option value="M">M</option>
              <option value="C">C</option>
            </select>
          </p>

          <p className='form_p'>
            <label htmlFor="price">가격</label>
            <input
              type="text"
              name='price'
              value={form.price}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label htmlFor="e_date">유통기한</label>
            <input
              type="text"
              name='e_date'
              value={form.e_date}
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

export default NoodleCreate;