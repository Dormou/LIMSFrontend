import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/Auth/AuthPage';
import { MainPage } from './pages/MainPage/MainPage';
import './App.css';
import { useSelector } from 'react-redux';
import { PersonalAreaPage } from './pages/PersonalAreaPage/PersonalAreaPage';

function App() {
  const footer = useSelector((state: any) => state.footer)
  const viewApp = useSelector((state: any) => state.viewApp)

  return (
    <div className={`App ${viewApp.scrollX? '': 'blockScrollX'} ${viewApp.scrollY? '': 'blockScrollY'}`}>
      <BrowserRouter> 
        <Routes>
        <Route path='/' element={<MainPage/>}/>
          <Route path='/personal-area' element={<PersonalAreaPage/>}/>
          <Route path='/signin' element={<AuthPage/>}/>
        </Routes>
      </BrowserRouter> 
      <div className='header'>
        {footer.show && footer.value} 
      </div>
    </div>
  );
}

export default App;