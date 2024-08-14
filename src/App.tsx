import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/Auth/AuthPage';
import { MainPage } from './pages/MainPage/MainPage';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PersonalAreaPage } from './pages/PersonalAreaPage/PersonalAreaPage';
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage';
import { Menu } from './pages/components/Menu/Menu';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect, useState } from 'react';
import { setShowMenu } from './connect/store';
import { DndProvider } from 'react-dnd';
import { Directory } from './pages/Directory/Directory';

export const personalAreaPath = '/personal-area'
export const projectsPath = '/projects'
export const signinPath = '/signin'
export const DirectoryPath = '/directory'


function App() {
  const dispatch = useDispatch()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  
  const propsMenu = useSelector((state: any) => state.menu)
  const footer = useSelector((state: any) => state.footer)
  const header = useSelector((state: any) => state.header)
  const viewApp = useSelector((state: any) => state.viewApp)

  //console.log(useSelector((state: any) => state))

  dispatch(dispatch(setShowMenu(false)))

  return (
    <div className={`App ${viewApp.scrollX? '': 'blockScrollX'} ${viewApp.scrollY? '': 'blockScrollY'}`}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter> 
          {header.show && header.value} 
            <div className={'body'}>
              {propsMenu.show && <Menu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}/>}
              <div onMouseEnter={() => setIsOpenMenu(false)} className={'scene'}>
                <Routes>
                  <Route path='/' element={<MainPage/>}/>
                  <Route path={personalAreaPath} element={<PersonalAreaPage/>}/>
                  <Route path={projectsPath} element={<ProjectsPage/>}/>
                  <Route path={signinPath} element={<AuthPage/>}/>
                  <Route path={DirectoryPath} element={<Directory/>}/>
                </Routes>
                {footer.show && footer.value} 
              </div>
          </div>
        </BrowserRouter> 
      </DndProvider>
    </div>
  );
}

export default App;