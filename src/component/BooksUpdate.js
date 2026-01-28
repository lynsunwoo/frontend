import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BooksUpdate() {

  const{num} = useParams(); //파라미터 값으로 key값을 담음
  const[form, setForm] = useState({
    num:'',
    name:'',
    area1:'',
    area2:'',
    area3:'',
    book_cnt:'',
    owner_nm:'',
    tel_num:''
  });

  const navigate = useNavigate();

  //서버측에 넘길 데이터(num)을 통신해서 성공, 실패 여부 출력
  useEffect(()=>{
    axios.get(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/books/${num}`)
    .then(res=>{
      console.log('서버응답값 :', res.data)
      setForm(res.data);
    })
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
  const handleSubmit=(e)=>{
    e.preventDefault();

    axios.put(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/books/booksupdate/${num}`,{
      name: form.name,
      area1: form.area1,
      area2: form.area2,
      area3: form.area3,
      book_cnt: form.book_cnt,
      owner_nm: form.owner_nm,
      tel_num: form.tel_num
    })
    .then(()=>{
      alert('상품이 수정되었습니다.');
      navigate('/books')
    })
    .catch(err => console.log('수정오류 :', err));
  }

  return (
    <main>
      <section className='create'>
        <h2>수정페이지</h2>
        <form onSubmit={handleSubmit} className="form_box">
          <p className='form_p'>
            <label htmlFor="num">상품번호</label>
            <input type="text" name='num' id='num' value={form.num} readOnly />
          </p>

          <p className='form_p'>
            <label htmlFor="name">서점 이름</label>
            <input type="text" name='name' id='name' value={form.name} onChange={handleChange} required />
          </p>

          <p className='form_p'>
            <label htmlFor="area1">지역1</label>
            <input type="text" name='area1' id='area1' value={form.area1} onChange={handleChange} required />
          </p>

          <p className='form_p'>
            <label htmlFor="area2">지역2</label>
            <input type="text" name='area2' id='area2' value={form.area2} onChange={handleChange} required />
          </p>

          <p className='form_p'>
            <label htmlFor="area3">지역3</label>
            <input type="text" name='area3' id='area3' value={form.area3} onChange={handleChange} required />
          </p>

          <p className='form_p'>
            <label htmlFor="book_cnt">상품개수</label>
            <input type="text" name='book_cnt' id='book_cnt' value={form.book_cnt} onChange={handleChange} required />
          </p>

          <p className='form_p'>
            <label htmlFor="owner_nm">구매자</label>
            <input type="text" name='owner_nm' id='owner_nm' value={form.owner_nm} onChange={handleChange} required />
          </p>

          <p className='form_p'>
            <label htmlFor="tel_num">전화번호</label>
            <input type="text" name='tel_num' id='tel_num' value={form.tel_num} onChange={handleChange} required/>
          </p>

          <button type='submit'>수정완료</button>
        </form>
      </section>
    </main>
  )
}


export default BooksUpdate;
