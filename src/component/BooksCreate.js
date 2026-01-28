import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { AlertContext } from '../AlertContext';

function BooksCreate() {

  //상태관리
  const [form, setForm] = useState({
    name: '',
    area1: '',
    area2: '',
    area3: '',
    book_cnt: 0,
    owner_nm: '',
    tel_num: ''
  });

  //카운트 상태관리
  // const { setBooksCount } = useContext(AlertContext);

  const navigate = useNavigate();

  //입력값 변경시
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //등록하기 버튼 클릭시 호출되는 함수 => 서버로 값 전달
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/books', form)
      .then(() => {
        alert('상품이 등록 되었습니다.');
        // setBooksCount(count => count + 1)
        navigate('/books');
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <section className="create">
        <h2>Bookscreate</h2>

        <form onSubmit={handleSubmit} className="form_box">
          <p className='form_p'>
            <label>서점명</label>
            <input
              type="text"
              name='name'
              value={form.name}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label htmlFor='area1'>지역1(도)</label>
            <select
              id="area1"
              name='area1'
              value={form.area1}
              onChange={handleChange}
            >
              <option value="">지역을 선택하세요.</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="경남">경남</option>
              <option value="강원">강원</option>
              <option value="대전">대전</option>
              <option value="부산">부산</option>
              <option value="제주도">제주도</option>
            </select>
          </p>

          <p className='form_p'>
            <label htmlFor='area2'>지역2(구)</label>
            <select
              id="area2"
              name='area2'
              value={form.area2}
              onChange={handleChange}
            >
              <option value="">구를 선택하세요.</option>
              <option value="서초">서초</option>
              <option value="성남">성남</option>
              <option value="남구">남구</option>
              <option value="창원">창원</option>
              <option value="서귀포">서귀포</option>
              <option value="수원">수원</option>
              <option value="해운대">해운대</option>
            </select>
          </p>

          <p className='form_p'>
            <label htmlFor='area3'>지역3(동)</label>
            <select
              id="area3"
              name='area3'
              value={form.area3}
              onChange={handleChange}
            >
              <option value="">동를 선택하세요</option>
              <option value="방배">방배</option>
              <option value="연남">연남</option>
              <option value="인사">인사</option>
              <option value="대림">대림</option>
              <option value="구기">구기</option>
              <option value="익선">익선</option>
              <option value="압구정">압구정</option>
            </select>
          </p>

          <p className='form_p'>
            <label>상품개수</label>
            <input
              type="number"
              name='book_cnt'
              value={form.book_cnt}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label>주문자</label>
            <input
              type="text"
              name='owner_nm'
              value={form.owner_nm}
              onChange={handleChange}
              required
            />
          </p>

          <p className='form_p'>
            <label>전화번호</label>
            <input
              type="text"
              name='tel_num'
              value={form.tel_num}
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


export default BooksCreate;
