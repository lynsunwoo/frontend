import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Fruit() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //0. 페이지네이션 변수 설정
  const [currentPage, setCurrentPage] = useState(1); //초기값1 페이지

  //검색기능 입력값 확정값 분리
  const [inputKeyword, setInputKeyword] = useState('');
  const [keyword, setKeyword] = useState('');

  //카운트 상태 변수 선언 
  const { setFruitsCount } = useContext(AlertContext);

  //검색 실행
  const handleSearch = () => {
    setKeyword(inputKeyword);
    setCurrentPage(1)
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
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );


  //0. 한 페이지에 보여줄 페이지 개수
  const itemsPerPage = 3;

  //1. 상품 리스트 출력(조회) GET 방식
  const loadData = () => {
    //비동기 통신 사용
    axios.get(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/fruit`)
      .then(res => {
        setData(res.data)
        setFruitsCount(res.data.length)
      })
      .catch(err => console.log(err))
  }

  //2. 콤포넌트 생성시 한번만 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  //선택한 상품 삭제하기
  const deleteData = (num) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios.delete(`https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/fruit/${num}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData(); // 삭제후 다시 불러오기
        })

        .catch(err => console.log(err));
    }
  }

  //현재 페이지의 마지막 인덱스 번호 (현재페이지 * 한 페이지에 보여질 페이지 개수)
  const indexOfLast = currentPage * itemsPerPage

  //현재 페이지의 첫 인덱스 번호를 계산
  const indexOfFirst = indexOfLast - itemsPerPage

  //data 배열 중 현재 페이지에 해당하는 부분만 잘라냅니다
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  //전체 페이지 수 totalpage = Math.ceil(13/5) = 3 무조건 올림
  const totalPage = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  //시작 번호와 끝 번호 계산
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, startPage + 4);

  //만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지도 다시보정
  startPage = Math.max(1, endPage - 4);

  //페이지 번호 배열(1~5고정, 또는 totalPage까지 제한 가능)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <main>
      <section>
        <h2>Fruits페이지</h2>
        <div className="new_list"><button onClick={() => navigate('/fruit/fruitcreate')}>글등록</button></div>
        <table className="data_list">
          <thead>
            <tr>
              <th>CODE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COLOR</th>
              <th>COUNTRY</th>
              <th>메뉴(삭제, 수정)</th>
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
                    <td>{Number(item.price).toLocaleString()}</td>
                    <td>{item.color}</td>
                    <td>{item.country}</td>
                    <td>
                      <button onClick={() => navigate(`/fruit/fruitupdate/${item.num}`)}>수정</button>
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
            disabled={currentPage === 1 ? true : false}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              color: currentPage === 1 ? '#fff' : '#333',
              backgroundColor: currentPage === 1 ? '#ccc' : '#e0e0e0,',
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
              color: currentPage === endPage ? '#fff' : '#333',
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


export default Fruit;

