import './App.css';
import { Route, Routes } from 'react-router-dom';
import Path from './utils/Path'
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
function App() {
  return (
    <div className="app">

      <Routes>

        <Route path={Path.HOME} element={<Home />} exact />
        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.LOGIN} element={<Login />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
