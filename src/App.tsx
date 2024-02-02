import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { MainPage } from './pages/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
        <Route path='/' element={<MainPage/>}/>
          <Route path='/signin' element={<SignInPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
        </Routes>
      </BrowserRouter> 
      <div className='header'>
        <div className="discriptionWhoDevelopment">
                  Разработано департаментом цифровых систем управления и технологии АО "НТЦ ФСК ЕЭС"®
        </div>    
      </div>
    </div>
  );
}

export default App;