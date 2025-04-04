import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Menu from './components/Menu';

import 'bootstrap/dist/css/bootstrap.min.css';
import FormRecord from './containers/Home/FormRecord';

function App() {
  return (
    <>
      <Menu />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/record' element={<FormRecord />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
