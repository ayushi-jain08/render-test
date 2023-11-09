import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/NavBar/Navbar';
import Home from './Components/Home/Home';
import About from './Page/About/About';
import Contact from './Page/Contact/Contact';
import Product from './Page/Product/Product';
import Cart from './Page/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Edit from './Components/Edit/Edit';
import SingleProduct from './Page/SingleProduct/SingleProduct';
import Forgot from './Page/Forgot/Forgot';
import PassWordReset from './Page/PasswordReset/PassWordReset';
import Search from './Page/Search/Search';
import Category from './Components/Category/Category';
import SubCategory from './Components/Category/SubCategory';
import ProductList from './Components/Category/ProductList';
import Group from './Components/Group';
import ChatPage from './Components/Chat/ChatPage/ChatPage';

function App() {
  return (
    <div>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/product/:ids' element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/edit' element={<Edit/>}/>
<Route path='/category' element={<Category/>}/>
<Route path='/category/:categoryId' element={<SubCategory/>}/>
<Route path='/subcategories/:subcategoryID' element={<ProductList/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/passwordreset/:id/:token' element={<PassWordReset/>}/>
       </Routes>
    </div>
  );
}

export default App;
