import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  //1. 상태변수 선언 username, password
  const [form, setForm] = useState({
    username: '', //아이디 저장을 위한 변수
    password: ''  //패스워드 저장을 위한 변수
  });

  const [error, setError] = useState('');

  // url주소 관리 - 로그인 성공시 이동할 페이지 설정을 위해 
  const navigate = useNavigate();

  //2. 입력시 발생되는 함수
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //3. 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(form.username, form.password)

    try { //성공시 실행내용
      const res = await axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/login', form);

      //사용자 인증이 끝나면 '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token);

      alert('로그인 성공');

      //해당페이지로 이동하기
      navigate('/');

      // 리디렉션 등 필요 시
    } catch (err) { //실패시 실행내용
      setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    }
  };
  return (
    <main>
      <section className='login'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className='login_form'>
          <p>
            <label htmlFor="username">아이디 :</label>
            <input type="text"
              id='username'
              name='username'
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="password">패스워드 :</label>
            <input
              type="text"
              id='password'
              name='password'
              placeholder='패스워드'
              value={form.password}
              onChange={handleChange}
            />
          </p>
          <p>
            <input type="submit" value='로그인' />
          </p>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p className="search_box">
            <Link to="/id_search">아이디 찾기</Link>
            <Link to="/pw_search">비번찾기</Link>
            <Link to="/join">회원가입</Link>
          </p>
        </form>


        <dl>
          <dt>* 로그인 구현 전체 구성</dt>
          <dd>1. 프로트엔드 : 로그인 폼 작성, 로그인 버튼 클릭시 서버넹 인증 요청하기</dd>
          <dd>2. 백앤드(Node.js + Express) : 로그인 처리, JWT토큰 발급</dd>
          <dd>3. 데이터베이스(MYSQL) : DB입출력</dd>
          <dd>4. 보안 : 비밀버호 bycrpt 암호화, JWT로 인증을 유지</dd>
        </dl>
      </section>
    </main>
  )
}


export default Login;
