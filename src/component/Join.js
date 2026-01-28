import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Join() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(''); //에러시 출력 변수
  const [success, setSuccess] = useState(''); //성공시 출력 변수

  //카운트 상태 변수
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setJoinCount } = useContext(AlertContext);

  //2. 사용자가 입력 양식에 입력을 했을 경우 input 내용을 저장하기 위한 함수
  const handleChange = e => {
    //id와 password를 입력하면 각각 변수에 담고
    setForm({ //id, password를 입력시 각각 해당 변수에 값을 담는다.
      ...form, //기존(...) 폼 데이터에 추가로 저장
      [e.target.name]: e.target.value
    } //id, pw저장
    );
    setError(''); //에러 초기화
    setSuccess(''); //성공 초기화
  };

  //3. 유효성 검사를 하여 모든 내용 서버로 전송되게 하기
  const handleSubmit = async e => {
    e.preventDefault(); //새로고침 방지

    //비밀번호 확인하기   비밀번호 1, 비밀번호 2가 일치하는지~
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다. 다시 확인하세요.');
      return;
    }

    try { //DB서버와 통신이 잘되면 POST방식으로 ID, PW를 넘긴다
      await axios.post('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/join', {
        username: form.username,
        password: form.password
      });

      setSuccess('회원가입이 완료되었습니다.');
      //전송이 끝나면 모든 값 초기화

      setForm({
        username: '', //이름 초기화
        password: '', //패스워드 초기화
        confirmPassword: ''
      });

    } catch (err) { //실패시 아래 에러 출력
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
    }
  };

  return (
    <main>
      <section className='login'>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className='login_form'>
          <p>
            <label htmlFor="username">아이디 :</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
              required />
          </p>

          <p>
            <label htmlFor="password">패스워드 :</label>
            <input type="password"
              id='password'
              name='password'
              placeholder='비밀번호'
              value={form.password}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="password">패스워드 확인 :</label>
            <input type="password"
              id='confirmPassword'
              name='confirmPassword'
              placeholder='비밀번호 확인'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </p>

          <p><input type='submit' value='회원가입' /></p>

          {/* 회원가입 에러가 나면 빨강색으로 문자 출력 */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* &&(조건부 렌더링 공식) : 조건에 맞으면 출력(실행) */}

          {/* 회원가입 성공이면 초록색으로 문자 출력 */}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </section>
    </main>
  )
}


export default Join;
