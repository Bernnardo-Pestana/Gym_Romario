
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (

    <div className='body'>
      <div className='main'>
        <Outlet />
      </div>
    </div>


  );
}

export default App;
