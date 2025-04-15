import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Menu from './components/Menu';

import 'bootstrap/dist/css/bootstrap.min.css';
import FormRecord from './containers/Home/FormRecord';
import { PAGE } from './constants';

function App() {
  return (
    <>
      <Menu />
      <Router>
        <Routes>
          <Route path={PAGE.ROOT} element={<Home />} />
          <Route path={PAGE.RECORD} element={<FormRecord />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
