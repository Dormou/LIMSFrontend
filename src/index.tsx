import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './connect/store';

const launchMock = true

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development' && launchMock) return
  
  const { worker } = await import('./mock/mock')

  return await worker.start()
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
 
enableMocking()
.then(() => {
  root.render(
    <React.StrictMode>
      <Provider store={store}> 
        <App />
      </Provider> 
    </React.StrictMode>
  )
})
.catch((e) => {
  console.log('error with enable mock', e)

  root.render(
    <React.StrictMode>
      <Provider store={store}> 
        <App />
      </Provider> 
    </React.StrictMode>
  )
})



reportWebVitals();