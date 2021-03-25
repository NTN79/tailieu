import React from 'react';
import './App.css';
import './Styles/Chat.css'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"; 
import Home from './pages/Home.js';
import ProductDetail from './pages/ProductDetail';
import Toast from './components/Toast';
import Checkout from './pages/Checkout';
import { CartProvider } from './contexts/Cart'
import { UserProvider } from './contexts/User';
// import Dashboard from './components/admin/Dashboard/Dashboard';

function App() {

  return (
    <UserProvider>
    <CartProvider>
        <Router>
          <div className="App">
            <Toast/>
            <Route path="/" exact component={Home}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/products/:id" exact component={ProductDetail}></Route>
            <Route path="/checkout" exact component={Checkout}></Route>  
            
          </div>
          {/* <OpenChatBtn/> */}
        </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;
