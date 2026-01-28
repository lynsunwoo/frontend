import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../AlertContext';

function Books() {
  //기본 상태 라우터
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //페이지네이션 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //검색 상태
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');

  //카운트 상태 변수 
  const { setBooksCount } = useContext(AlertContext);

  //1. 상품 리스트 출력(조회) 방식
  const loadData = () => {
    //비동기 통신 사용
    axios.get(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/books`)
      .then(res => {
        setData(res.data)
        setBooksCount(res.data.length)
      })
      .catch(err => console.log(err))
  }

  //2. 콤포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  //삭제를 위한 함수
  const deleteData = (num) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:9070/books/${num}`)
        .then(() => {
          alert('데이터가 성공적으로 삭제되었습니다.');
          loadData();
        })
        .catch(err => console.log(err));
    }
  };

  //검색 로직
  const handleSearch = () => {
    setKeyword(inputKeyword);
    setCurrentPage(1);
  };

  //Enter 키 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  //검색 초기화
  const handleReset = () => {
    setInputKeyword('');
    setKeyword('');
    setCurrentPage(1);
  };

  //검색 필터링
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLocaleLowerCase())
  );

  //페이지 네이션 계산 현재 게시물 수 
  const indexOfLast = currentPage * itemsPerPage;

  //현재 페이지의 첫 인덱스 번호를 계산
  const indexOfFirst = indexOfLast - itemsPerPage;

  //data 배열중 현재 페이지에 해당하는 부분만 잘라낸다.
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  //전체 페이지수 올림하여 계산
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  //시작 번호와 끝 번호 계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  //만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지 다시 보정
  startPage = Math.max(1, endPage - 4);

  //페이지 번호 배열
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);




  return (
    <main>
      <section>
        <h2>Books페이지</h2>
        <div className="new_list"><button onClick={() => navigate('/books/bookscreate')}>글등록</button></div>
        <table className="data_list">
          <thead>
            <tr>
              <th>num</th>
              <th>name</th>
              <th>area1</th>
              <th>area2</th>
              <th>area3</th>
              <th>book_cnt</th>
              <th>owner_nm</th>
              <th>tel_num</th>
              <th>
                메뉴(삭제, 수정)
              </th>
            </tr>
          </thead>

          <tbody>
            {
              currentItems.length > 0 ? (
                currentItems.map(item => (
                  // data.map(item => (
                  <tr key={item.num}>
                    <td>{item.num}</td>
                    <td>{item.name}</td>
                    <td>{item.area1}</td>
                    <td>{item.area2}</td>
                    <td>{item.area3}</td>
                    <td>{item.book_cnt}</td>
                    <td>{item.owner_nm}</td>
                    <td>{item.tel_num}</td>
                    <td>
                      <button onClick={() => navigate(`/books/booksupdate/${item.num}`)}>수정</button>
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


export default Books;
