import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function GoodsUpdate() {
  //1. 변수선언 상품명, 가격정보

  //URL 경로에서 g_code 값을 추출
  const{g_code} = useParams(); //받아온 code 파라미터 값

  const [form, setForm] = useState({
    g_code:'',
    g_name:'',
    g_cost:''
  });

  const navigate = useNavigate();

  //2. 서버측에 넘길 데이터(g_code)를 통신해서 성공, 실패 여부 출력
  //컴포넌트가 마운트될 때, 해당 상품 정보를 서버에서 조회

  useEffect(()=>{
    axios.get(`http://localhost:9070/goods/${g_code}`)
    //성공이면 출력
    .then(res=>{
      console.log('서버 응답값:', res.data);
      setForm(res.data);
    })
    //실패면 오류 메세지
    .catch(err => console.log('조회오류 :', err));
  }, [g_code]);

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

    axios.put(`http://localhost:9070/goods/goodsupdate/${g_code}`,{
      g_name: form.g_name,
      g_cost: form.g_cost
    })
    .then(()=>{
      alert('상품이 수정되었습니다.');
      navigate('/goods'); //상품페이지로 이동
    })//통신 실패시
    .catch(err => console.log('수정오류 :', err));
  }

  return (
    <main>
      <section className="create">
        <h2>수정 페이지</h2>
        <form onSubmit={handleSubmit} className="form_box">
          <p className="form_p">
            <label htmlFor="g_code">코드번호 </label>
            <input type="text" name='g_code' id='g_code' value={form.g_code} readOnly />
            {/* readOnly : 읽기만 가능 수정 불가 */}
          </p>

          <p className="form_p">
            <label htmlFor="g_name">상품명 </label>
            <input type="text" name='g_name' id='g_name' onChange={handleChange} value={form.g_name} required />
          </p>

          <p className="form_p">
            <label htmlFor="g_cost">가격 </label>
            <input type="number" name='g_cost' id='g_cost' onChange={handleChange} value={form.g_cost} required />
          </p>

          <button type='submit'>수정완료</button>
        </form>
      </section>
    </main>
  )
}

export default GoodsUpdate;