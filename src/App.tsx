import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; //  Импорт  Bootstrap  CSS
import Header from "./Components/Header";
import AdminPanel from './Components/AdminPanel';


// Орендерим только один компонент - либо AdminPanel, либо Header
// в зависимости от того, нужна ли вам админка на этой странице или нет.

// Если нужна админка:


// Если НЕ нужна админка, а нужен обычный Header:
// root.render(
//   <React.StrictMode>
//     <App /> {/* Рендерим компонент App, который содержит Header */}
//   </React.StrictMode>
// );


function App() {  //  Компонент App,  если  нужен  Header  на  другой странице
  return (
    <>
      <Header />
      <AdminPanel />
    </>
  );
}

export default App;




