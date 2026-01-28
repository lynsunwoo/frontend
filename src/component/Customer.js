import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../AlertContext';

function Customer() {
  /* ==================================================
  1️ 기본 상태 & 라우터
 ================================================== */
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  /* ==================================================
  3️ 검색 상태 (입력값 / 확정값 분리)
================================================== */
  const [inputKeyword, setInputKeyword] = useState(''); // 입력창용
  const [keyword, setKeyword] = useState('')            // 실제 검색용

  //카운트 상태 변수
  const { setCustomerCount } = useContext(AlertContext);
  /* ==================================================
  4️ 서버 통신 (조회)
================================================== */
  const loadData = () => {
    axios.get(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/customer`)
      .then(res => {
        setData(res.data);
        setCustomerCount(res.data.length);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadData();
  }, [])

  /* ==================================================
    5️ 삭제 기능
  ================================================== */
  const deleteData = (id) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios.delete(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/customer/${id}`)
        .then(() => {
          alert('데이터가 성공적으로 삭제되었습니다.');
          loadData();
        })
        .catch(err => console.log(err));
    }
  };

  /* ==================================================
  6️ 검색 로직
================================================== */
const handleSearch = () =>{
  setKeyword(inputKeyword); //입력값 확정
  
};

//Enter 키 검색
const handleKeyDown = (e) => {
  if(e.key === 'Enter'){
    handleSearch();
  }
};

//검색 초기화
const handleReset = () =>{
  setInputKeyword('');
  setKeyword('');
  
};

//검색 필터링 (대소문자 구분 없음)
const filteredData = data.filter(item => 
  item.c_name.toLowerCase().includes(keyword.toLowerCase())
)
  return (
    <main>
      <section>
        <h2>Customer페이지</h2>
        <div className="new_list"><button onClick={() => navigate('/customer/customercreate')}>글등록</button></div>
        <table className='data_list'>
          <thead>
            <tr>
              <th>id</th>
              <th>c_name</th>
              <th>c_address</th>
              <th>c_tel</th>
              <th>글수정/삭제</th>
            </tr>
          </thead>

          <tbody>
            {
              filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.c_name}</td>
                  <td>{item.c_address}</td>
                  <td>{item.c_tel}</td>
                  <td>
                    <button>수정</button>
                    <button onClick={() => deleteData(item.id)}>삭제</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {/* 페이지 네이션 */}
        <div style={{ margin: '20px auto', textAlign: 'center', width: '700px' }}>
          <button
            style={{
              color: '#333',
              backgroundColor: '#e0e0e0',
              marginRight: '5px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            이전
          </button>

          <button
            style={{
              marginRight: '5px',
              backgroundColor: '#f0f0f0',
              color: '#333',
              padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px'
            }}
          >
            1
          </button>

          <button
            style={{
              color: '#333',
              backgroundColor: '#e0e0e0',
              marginRight: '5px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            다음
          </button>
        </div>

        {/* 검색폼 */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <input
            type="text"
            style={{
              width: '250px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            placeholder='검색어를 입력하세요'
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSearch}
            style={{
              marginLeft: '10px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#0F2854',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            검색
          </button>

          <button
            onClick={handleReset}
            style={{
              marginLeft: '5px',
              padding: '8px 15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#e0e0e0',
              cursor: 'pointer'
            }}
          >
            초기화
          </button>
        </div>
      </section>
    </main>
  )
}


export default Customer;

