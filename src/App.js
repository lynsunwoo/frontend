import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Goods from './component/Goods';
import Fruit from './component/Fruit';
import Noodle from './component/Noodle';
import Books from './component/Books';
import Customer from './component/Customer';
import QuestionList from './component/QuestionList';
import Login from './component/Login';
import Join from './component/Join';
import Main from './Main';
import GoodsCreate from './component/GoodsCreate';
import FruitCreate from './component/FruitCreate';
import BooksCreate from './component/BooksCreate';
import NoodleCreate from './component/NoodleCreate';
import CustomerCreate from './component/CustomerCreate.js';
import GoodsUpdate from './component/GoodsUpdate';
import FruitUpdate from './component/FruitUpdate';
import NoodleUpdate from './component/NoodleUpdate';
import BooksUpdate from './component/BooksUpdate';
import Question from './component/Question';
import { AlertProvider, AlertContext } from './AlertContext.js';

function AppContent() {
  //1. 숫자 알림 카운트
  const { goodsCount } = React.useContext(AlertContext);
  const { fruitsCount } = React.useContext(AlertContext);
  const { noodleCount } = React.useContext(AlertContext);
  const { booksCount } = React.useContext(AlertContext);
  const { customerCount } = React.useContext(AlertContext);
  const { questionCount } = React.useContext(AlertContext);
  const { joinCount } = React.useContext(AlertContext);

  //2. 숫자 배지 스타일 서식
  const badgeStyle = {
    display: 'inline-block',
    marginLeft: 6,
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '22px',
    fontWeight: 'bold'
  }

  return (
    <BrowserRouter>
      <header>
        <h1>Frontend-메인</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/goods">
                Goods{
                  goodsCount > 0 && (
                    <span style={badgeStyle}>
                      {goodsCount}
                    </span>
                  )}
              </Link>
            </li>
            <li>
              <Link to="/fruit">
                Fruits{
                  fruitsCount > 0 && (
                    <span style={badgeStyle}>
                      {fruitsCount}
                    </span>
                  )}
              </Link>
            </li>
            <li>
              <Link to="/noodle">
                Noodle{
                  noodleCount > 0 && (
                    <span style={badgeStyle}>
                      {noodleCount}
                    </span>
                  )}
              </Link>
            </li>
            <li>
              <Link to="/books">
                Books{
                  booksCount > 0 && (
                    <span style={badgeStyle}>
                      {booksCount}
                    </span>
                  )}
              </Link>
            </li>
            <li>
              <Link to="/customer">
                Customer{
                  customerCount > 0 && (
                    <span style={badgeStyle}>
                      {customerCount}
                    </span>
                  )}
              </Link>
            </li>
            <li>
              <Link to="/question">
                Question{
                  questionCount > 0 && (
                    <span style={badgeStyle}>
                      {questionCount}
                    </span>
                  )}
              </Link>
            </li>
            <li><Link to="/login">Login</Link></li>
            <li>
              <Link to="/join">
              Join{
                joinCount > 0 && (
                  <span style={badgeStyle}>
                    {joinCount}
                  </span>
                )}
              </Link>
              </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/fruit" element={<Fruit />} />
        <Route path="/noodle" element={<Noodle />} />
        <Route path="/books" element={<Books />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/quesionlist" element={<QuestionList />} />

        <Route path="/goods/goodscreate" element={<GoodsCreate />} />
        <Route path="/fruit/fruitcreate" element={<FruitCreate />} />
        <Route path="/books/bookscreate" element={<BooksCreate />} />
        <Route path="/noodle/noodlecreate" element={<NoodleCreate />} />
        <Route path="/customer/customercreate" element={<CustomerCreate />} />

        <Route path="/goods/goodsupdate/:g_code" element={<GoodsUpdate />} />
        <Route path="/fruit/fruitupdate/:num" element={<FruitUpdate />} />
        <Route path="/noodle/noodleupdate/:num" element={<NoodleUpdate />} />
        <Route path="/books/booksupdate/:num" element={<BooksUpdate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />

      </Routes>

      <footer className="footer">
        <address>
          Copyright&copy;2025 React 학습 목차 all rights reserved.
        </address>
      </footer>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}
export default App;
