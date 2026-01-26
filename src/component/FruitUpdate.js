import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

function FruitUpdate() {
  //1. 변수선언 상품명, 가격정보, 컬러, 원산지

  //URL 경로에서 num 값을 추출
  const{num} =useParams(); //받아온 code파라미터 값
  const [form, setForm] = useState({
    num:'',
    name:'',
    price:'',
    color:'',
    country:''
  });

  const navigate = useNavigate();

  //2. 서버측에 넘길 데이터 (num)을 통신해서 성공, 실패 여부 출력
  useEffect(()=>{
    axios.get(`http://localhost:9070/fruit/${num}`)
    //성공이면 출력
    .then(res=>{
      console.log('서버응답값:', res.data);
      setForm(res.data);
    })
    //실패면 오류 메세지
    .catch(err => console.log('조회 오류 :', err));
  }, [num]);

  //사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장하기
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //수정하기 메뉴 클릭시 실행되는 함수
  //수정 폼 제출시 서버에 PUT요청 전송
  const handleSubmit =(e)=>{
    e.preventDefault();

    axios.put(`http://localhost:9070/fruit/fruitupdate/${num}`,{
      name: form.name,
      price: form.price,
      color: form.color,
      country: form.country
    })
    .then(()=>{
      alert('상품이 수정되었습니다.');
      navigate('/fruit')
    })
    .catch(err=> console.log('수정오류 :', err));
  }

  return (
    <main>
      <section className="create">
        <h2>수정페이지</h2>
        <form onSubmit={handleSubmit} className="form_box">
          <p className="form_p">
            <label htmlFor="num">상품번호 </label>
            <input type="text" name='num' id='num' value={form.num} readOnly />
          </p>

          <p className="form_p">
            <label htmlFor="name">과일이름 </label>
            <input type="text" name='name' id='name' value={form.name} onChange={handleChange} required />
          </p>

          <p className="form_p">
            <label htmlFor="price">과일가격 </label>
            <input type="number" name='price' id='price' value={form.price} onChange={handleChange} required />
          </p>

          <p className="form_p">
            <label htmlFor="color">과일색상 </label>
            <input type="text" name='color' id='color' value={form.color} onChange={handleChange} required />
          </p>

          <p className="form_p">
            <label htmlFor="country">원산지 </label>
            <input type="text" name='country' id='country' value={form.country} onChange={handleChange}  required />
          </p>

          <button type='submit'>수정완료</button>
        </form>
      </section>
    </main>
  )
}

export default FruitUpdate;