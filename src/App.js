import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import CreateUser from './components/CreateUser';

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;