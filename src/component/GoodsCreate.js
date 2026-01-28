import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../AlertContext';

function GoodsCreate() {
  // 상태값 관리
  const [form, setForm] = useState({
    g_name: '',
    g_cost: ''
  });

  const navigate = useNavigate();

  //카운트 상태 변수 관리
  // const { setGoodsCount } =useContext(AlertContext);

  // 입력값 변경 시
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //등록하기 버튼 클릭시 호출되는 함수 => 서버로 값 전달 (백앤드)
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/goods', form)
      .then(() => {
        alert('상품이 등록 되었습니다.');
        // setGoodsCount(count => count + 1 );
        navigate('/goods'); //상품 등록완료 후 goods페이지로 이동
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <section className='create'>``
        <h2>GoodsCreate</h2>

        <form onSubmit={handleSubmit} className='form_box'>
          <p className='form_p'>
            <label>상품명 </label>
            <input
              type="text"
              name="g_name"
              value={form.g_name}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label>가격정보 </label>
            <input
              type="number"
              name="g_cost"
              value={form.g_cost}
              onChange={handleChange}
              required
            />
          </p>

          <button type="submit">상품등록하기</button>
        </form>
      </section>
    </main>
  );
}

export default GoodsCreate;

