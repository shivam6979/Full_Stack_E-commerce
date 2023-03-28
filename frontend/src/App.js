import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation.js';
import Home from "./pages/Home.js"
import Login from './pages/Login';
import { useSelector } from 'react-redux';

import Signup from './pages/Signup';
import NewProduct from './pages/NewProduct';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './component/ScrollToTop';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import EditProductPage from './pages/EditProductPage';

function App() {
  const user = useSelector((state)=> state.user);
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
        <Navigation/>
        <Routes>
          <Route index element ={<Home/>}/>
          {!user && (<>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </>
          )}
          {/* [3:40:47] */}
          {user && (
            <>
              <Route path='/cart' element={<CartPage />}/>
              <Route path='/orders' element={<OrdersPage />}/>
            </>
          )}

          {/* for admin [05:27:03] */}
          {user && user.isAdmin && (
            <>
              <Route path='/admin' element={<AdminDashboard />}/>
              <Route path='/product/:id/edit' element={<EditProductPage />}/>

            </>
          )}

          <Route path='/product/:id' element={<ProductPage />}/>

          <Route path='/category/:category' element={<CategoryPage />}/>

          <Route path='/new-product' element={<NewProduct />}/>

          <Route path='*' element={<Home/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
