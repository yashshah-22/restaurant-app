
import './App.css';
import Login from './screens/Login';
import Home from './screens/Home';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
function App() {
  return (
    <div>
    <CartProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/myorder" element={<MyOrder/>}/>
      </Routes>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;
