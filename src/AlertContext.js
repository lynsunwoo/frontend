import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [goodsCount, setGoodsCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [noodleCount, setNoodleCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [joinCount, setJoinCount] = useState(0);

  //페이지 로딩시 1번만 데이터 불러옴.
  useEffect(() => {
    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/user-count')
      .then(res => setJoinCount(res.data.count));

    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/goods')
      .then(res => setGoodsCount(res.data.length));

    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/fruit')
      .then(res => setFruitsCount(res.data.length));

    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/noodle')
      .then(res => setNoodleCount(res.data.length));

    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/books')
      .then(res => setBooksCount(res.data.length));

    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/customer')
      .then(res => setCustomerCount(res.data.length));

    axios.get('https://port-0-backend-express-sever-mkvwe6z7891e08f1.sel3.cloudtype.app/question')
      .then(res => setQuestionCount(res.data.length));
  }, []);


  return (
    <AlertContext.Provider value={{
      questionCount, setQuestionCount,
      goodsCount, setGoodsCount,
      fruitsCount, setFruitsCount,
      noodleCount, setNoodleCount,
      booksCount, setBooksCount,
      customerCount, setCustomerCount,
      joinCount, setJoinCount
    }}>
      {children}
    </AlertContext.Provider>
  );

}
