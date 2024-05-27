import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/Auth/AuthPage';
import { MainPage } from './pages/MainPage/MainPage';
import './App.css';
import { useSelector } from 'react-redux';
import { PersonalAreaPage } from './pages/PersonalAreaPage/PersonalAreaPage';

export const personalAreaPath = '/personal-area'
export const signinPath = '/signin'

function App() {
  const footer = useSelector((state: any) => state.footer)
  const header = useSelector((state: any) => state.header)
  const viewApp = useSelector((state: any) => state.viewApp)


  return (
    <div className={`App ${viewApp.scrollX? '': 'blockScrollX'} ${viewApp.scrollY? '': 'blockScrollY'}`}>
      
      <BrowserRouter> 
        {header.show && header.value} 
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path={personalAreaPath} element={<PersonalAreaPage/>}/>
          <Route path={signinPath} element={<AuthPage/>}/>
        </Routes>
        {footer.show && footer.value} 
      </BrowserRouter> 
    </div>
  );
}

export default App;