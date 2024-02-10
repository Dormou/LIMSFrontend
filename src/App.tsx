import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { MainPage } from './pages/MainPage/MainPage';
import { PersonalAreaPage } from './pages/PersonalAreaPage/PersonalAreaPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
        <Route path='/' element={<MainPage/>}/>
          <Route path='/personal-area' element={<PersonalAreaPage/>}/>
          <Route path='/signin' element={<SignInPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;