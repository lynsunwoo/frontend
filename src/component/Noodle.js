import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Noodle() {
  //기본 상태 & 라우터
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //카운트 상태변수
  const { setNoodleCount } = useContext(AlertContext);

  //페이지네이션 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  //검색상태 (입력값 / 확정값 분리)
  const [inputKeyword, setInputKeyword] = useState('') //입력창용
  const [keyword, setKeyword] = useState('') //실제 겁색용

  //서버통신 (조회)
  const loadData = () => {
    axios.get(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/noodle`)
      .then(res => {
        setData(res.data)
        // setNoodleCount(count => count + 1)
        setNoodleCount(res.data.length);
      })
      .catch(err => console.log(err))
  }

  //컴포넌트 최초실행 시 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  //삭제를 위한 (deleteData)
  const deleteData = (num) => {
    if (window.confirm('정말로 삭제 하시겠습니까?')) {
      axios.delete(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/noodle/${num}`)
        .then(() => {
          alert('데이터가 성공적으로 삭제되었습니다.');
          loadData();// 다시 목록 띄우기
        })
        //실패 경우
        .catch(err => console.log(err));
    }
  };

  //검색 로직
  //검색 실행
  const handleSearch = () => {
    setKeyword(inputKeyword); //입력값 확정
    setCurrentPage(1); //검색 시 항상 1페이지
  };

  //Enter키 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  //검색 초기화
  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
    setCurrentPage(1);
  };

  //검색 필터링 (대소문자 구분 X)
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLocaleLowerCase())
  );

  // 페이지 네이션 계산
  //페이지 네이션 계산 현재 게시물 수 
  const indexOfLast = currentPage * itemsPerPage;

  //현재 페이지의 첫 인덱스 번호를 계산
  const indexOfFirst = indexOfLast - itemsPerPage;

  //data 배열중 현재 페이지에 해당하는 부분만 잘라낸다.
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  //전체 페이지수 올림하여 계산
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  //시작 번호와 끝 번호 계산
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  //만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지 다시 보정
  startPage = Math.max(1, endPage - 2);

  //페이지 번호 배열
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);



  return (
    <main>
      <section>
        <h2>Noodle페이지</h2>
        <div className="new_list"><button onClick={() => navigate('/noodle/noodlecreate')}>글등록</button></div>
        <table className="data_list">
          <thead>
            <tr>
              <th>num</th>
              <th>name</th>
              <th>company</th>
              <th>kind</th>
              <th>price</th>
              <th>e_date</th>
              <th>글 수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.length > 0 ? (
                currentItems.map(item => (
                  // data.map(item=>(
                  <tr key={item.num}>
                    <td>{item.num}</td>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.kind}</td>
                    <td>{item.price}</td>
                    <td>{item.e_date}</td>
                    <td>
                      <button onClick={() => navigate(`/noodle/noodleupdate/${item.num}`)}>수정</button>
                      <button onClick={() => deleteData(item.num)}>삭제</button>
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
        {/* 페이지 네이션 */}

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
            }}
          >
            이전
          </button>

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
            }}
          >
            다음
          </button>
        </div>

        {/* 검색폼 */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <input
            type='text'
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


export default Noodle;
