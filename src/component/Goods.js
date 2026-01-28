import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Goods() {
  /* ==================================================
    1️ 기본 상태 & 라우터
   ================================================== */
  const [data, setData] = useState([]);       // 서버에서 받은 전체 상품 데이터
  const navigate = useNavigate();             // 페이지 이동용

  //카운트 상태 변수
  const {setGoodsCount} = useContext(AlertContext);
  /* ==================================================
    2️ 페이지네이션 상태
  ================================================== */
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5;                             // 페이지당 게시물 수

  /* ==================================================
    3️ 검색 상태 (입력값 / 확정값 분리)
  ================================================== */
  const [inputKeyword, setInputKeyword] = useState(''); // 입력창용
  const [keyword, setKeyword] = useState('');           // 실제 검색용

  /* ==================================================
    4️ 서버 통신 (조회)
  ================================================== */
  const loadData = () => {
    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/goods')
      .then(res => {
        setData(res.data);
        setGoodsCount(res.data.length);
      })
      .catch(err => console.log(err));
  };

  // 컴포넌트 최초 실행 시 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  /* ==================================================
    5️ 삭제 기능
  ================================================== */
  const deleteData = (g_code) => {
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      axios.delete(`http://localhost:9070/goods/${g_code}`)
        .then(() => {
          alert('데이터가 성공적으로 삭제되었습니다.');
          loadData(); // 삭제 후 목록 재조회
        })
        .catch(err => console.log(err));
    }
  };

  /* ==================================================
    6️ 검색 로직
  ================================================== */

  // 검색 실행
  const handleSearch = () => {
    setKeyword(inputKeyword); // 입력값 확정
    setCurrentPage(1);        // 검색 시 항상 1페이지
  };

  // Enter 키 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 검색 초기화
  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
    setCurrentPage(1);
  };

  // 검색 필터링 (대소문자 구분 X)
  // includes(keyword.toLowerCase() : 부분일치 검색 
  const filteredData = data.filter(item =>
    item.g_name.toLowerCase().includes(keyword.toLowerCase())
  );

  /* ==================================================
    7️ 페이지네이션 계산
  ================================================== */

  // 현재 페이지 기준 인덱스 계산
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  // 현재 페이지 데이터
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  // 전체 페이지 수 (검색 결과 기준)
  const totalPage = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  // 페이지 버튼 범위 계산 (최대 5개)
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);
  startPage = Math.max(1, endPage - 4);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <main>
      <section>
        <h2>Goods페이지</h2>
        <div className="new_list"><button onClick={() => navigate(`/goods/goodscreate`)}>글등록</button></div>
        <table className="data_list">
          <thead>
            <tr>
              <th>CODE</th>
              <th>NAME</th>
              <th>COST</th>
              <th>메뉴(삭제, 수정)</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.length > 0 ? (
                currentItems.map(item => (
                  // data.map(item => (
                  <tr key={item.g_code}>
                    <td> {item.g_code}</td>
                    <td> {item.g_name}</td>
                    <td> {Number(item.g_cost).toLocaleString()}
                    </td>
                    <td>
                      <button onClick={() => navigate(`/goods/goodsupdate/${item.g_code}`)}>수정</button>
                      <button onClick={() => deleteData(item.g_code)}>삭제</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div style={{ margin: '20px auto', textAlign: 'center', width: '700px' }}>

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 ? true : false}
            style={{
              color: currentPage === 1 ? '#e0e0e0' : '#333',
              backgroundColor: currentPage === 1 ? '#ccc' : '#e0e0e0',
              marginRight: '5px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}>
            이전</button>

          {pageNumbers.map(number => (
            <button
              onClick={() => setCurrentPage(number)}
              key={number}
              style={{
                marginRight: '5px', backgroundColor: currentPage === number ? '#9AA6B2' : '#f0f0f0',
                color: currentPage === number ? '#fff' : '#333',
                padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px'
              }}
            >
              {number}
            </button>
          ))}


          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === endPage ? true : false}
            style={{
              color: currentPage === endPage ? '#e0e0e0' : '#333',
              backgroundColor: currentPage === endPage ? '#ccc' : '#e0e0e0',
              marginRight: '5px',
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}>
            다음
          </button>

        </div>

        {/* 검색폼 */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder='상품명 검색'
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '250px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
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


export default Goods;
