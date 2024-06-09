import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import DonePage from './done_page';
import Homepage from './homepage'; // Импортируем компонент домашней страницы
import './Styles/App.scss'; // Предполагается, что у вас есть стили

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/done_page" element={<DonePage />} />
        </Routes>
    </Router>
  );
};

export default App;