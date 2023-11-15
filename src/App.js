import './App.css';
import { Route, Routes } from 'react-router-dom';
import Path from './utils/Path'
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Forgot/ForgotPassword';

import { Logout } from './pages/Logout/Logout';
import { Admin} from './pages/Admin/Admin';
import { Classmanager } from './pages/Classmanager/Classmanager';


function App() {
  return (
    <div className="app">

      <Routes>
        <Route path='/admin' element={<Admin/>}>
          <Route path={"/admin"+Path.CLASSMANAGER} element={<Classmanager/>}/>
        </Route>
        <Route path={Path.HOME} element={<Home />} exact />
        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.FORGOT} element={<ForgotPassword />} />
        <Route path={Path.LOGOUT} element={<Logout/>}/>
       
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
