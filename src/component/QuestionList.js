import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AlertContext } from '../AlertContext';
// import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuestionList() {
  //1. 가져올 데이터 변수 선언
  const [data, setData] = useState([]);

  // // 카운트 상태 변수 선언

  // const navigate = useNavigate();
  // const { setQuestionCount } = useContext(AlertContext);

  //2. 문의하기에 등록된 글 가져오기
  const loadData = () => {
    axios.get('http://localhost:9070/api/question')
      .then(res => {
        setData(res.data);
        // setQuestionCount(res.data.length);
      })
      .catch(err => console.log(err));
  };

  //3. 콤포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  //4. 날짜 데이터 포멧
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR'); //한국 지역 날짜
  };

  return (
    <main>
      <section>
        <h2>Question List</h2>

        <table className="data_list">
          <thead>
            <tr>
              <th>ID</th>
              <th>성함</th>
              <th>휴대전화</th>
              <th>이메일</th>
              <th>문의내용</th>
              <th>접수일</th>
              <th>답변</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.content}</td>
                  <td>{formatDate(new Date())}</td>
                  <td><button>답변</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  등록된 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}


export default QuestionList;