import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NoodleUpdate() {
  const {num} = useParams();

  const [form, setForm] = useState({
    num:'',
    name:'',
    company:'',
    price:'',
    kind:'',
    e_date:''
  });

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/noodle/${num}`)
    .then(res=>{
      console.log('서버 응답값 :',res.data);
      setForm(res.data);
    })
    .catch(err => console.log('조회오류 :', err));
  },[num]);

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //수정 폼 제출시 서버에 put 요청 전송
  const handleSubmit =(e)=>{
    e.preventDefault();

    axios.put(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/noodle/noodleupdate/${num}`,{
      name: form.name,
      company: form.company,
      price: form.price,
      kind: form.kind,
      e_date: form.e_date
    })
    .then(()=>{
      alert('상품이 수정되었습니다.');
      navigate('/noodle');
    })
    .catch(err=> console.log('수정오류 :', err));
  }
  return (
    <main>  
      <section className="create">
        <h2>수정 페이지</h2>
        <form onSubmit={handleSubmit} className='form_box'>
          <p className='form_p'>
            <label htmlFor="num">코드번호</label>
            <input type="text" name='num' id='num' value={form.num} readOnly />
          </p>

          <p className='form_p'>
            <label htmlFor="">상품이름</label>
            <input type='text' name='name' id='name' value={form.name} onChange={handleChange} required />
          </p>
          
          <p className='form_p'>
            <label htmlFor="company">브랜드</label>
            <input type='text' name='company' id='company' value={form.company} onChange={handleChange} required />
          </p>
          
          <p className='form_p'>
            <label htmlFor="kind">종류</label>
            <input type='text' name='kind' id='kind' value={form.kind} onChange={handleChange} required />
          </p>
          
          <p className='form_p'>
            <label htmlFor="">가격</label>
            <input type='number' name='price' id='price' value={form.price} onChange={handleChange} required />
          </p>
          
          <p className='form_p'>
            <label htmlFor="e_date">유통기한</label>
            <input type='text' name='e_date' id='e_date' value={form.e_date} onChange={handleChange} required />
          </p>

          <button type='submit'>수정완료</button>
        </form>
      </section>
    </main>
  )
}


export default NoodleUpdate;
