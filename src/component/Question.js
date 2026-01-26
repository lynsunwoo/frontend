import React, { useState, useEffect, useContext } from 'react';
import { AlertContext  } from '../AlertContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Question() {
  //1. 상태변수
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    content: '',
  });
  //2. 체크박스 상태 변수
  const [agree, setAgree] = useState(false); //동의하지 않은 상태

  // 카운트 상태 변수 선언
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setQuestionCount } = useContext(AlertContext); 

  //3. 입력값 변경시
  // const handleChange = (e) =>{
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  }

  //4. 문의하기 버튼 동의 여부체크 (유효성 검사)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) { //체크박스에 체크를 하지 않았다면,
      alert('개인 정보처리 방침에 동의해주세요.');
      return;
    }

    //5. 유효성이 통과되면 전송하기 
    axios.post('http://localhost:9070/api/question', formData)
      .then(() => { //통신이 성공적으로 이루어지면
        alert('문의가 등록되었습니다');
        setQuestionCount(count => count + 1); // 카운트 값이 증가
        //다시 빈값으로 만들기
        setFormData({
          name: '',
          phone: '',
          email: '',
          content: '',
        });
        //동의도 빈값으로 만들기
        setAgree(false);
        navigate('/question/quesionlist');
      })
      .catch(err => console.log(err));
  };


  return (
    <main>
      <section className='qna'>
        <form onSubmit={handleSubmit} className="qna_form" >

          <fieldset className="form_group">
            <legend>문의 정보 입력</legend>
            <h2>정성을 다해 답변을<br />해드리겠습니다.</h2>

            <div className="form_inner">
              <div className="left">

                <div className="name_box">
                  <label htmlFor="name">
                    <span>성함</span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="성함을 입력해주세요"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="tel_box">
                  <label htmlFor="phone">
                    <span>전화번호</span>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="전화번호를 입력해주세요"
                      maxLength={11}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="email_box">
                  <label htmlFor="email">
                    <span>이메일</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="이메일을 입력해주세요"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="right">
                <label htmlFor="content">내용</label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="내용을 입력해주세요"
                  cols="30" rows="10"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </fieldset>


          <div className="bottom">
            <label htmlFor='agree'>
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}

              />
              개인정보처리방침 동의합니다
            </label>

            <input type="submit" value="SEND" />
          </div>
        </form>

        <button className="qnalist_button" onClick={() => navigate('/question/quesionlist')}>문의 목록 보기</button>
      </section>

    </main>
  )
}

export default Question;