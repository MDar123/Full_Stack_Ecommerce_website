import Header from './Components/Header/Header'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProductManagement from './Components/Product/Product'
import Home from './Components/Home/Home'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import { useState } from 'react'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'
import SignUp from './Components/Login/Signup'
import Login from './Components/Login/Login'
import OrderDetails from './Components/OrderList/OrderList'
import User from './Components/User/User'
import UserProfile from './Components/UserProfile/UserProfile'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
function App() {
  const [cartshownumber, setcartshownumber] = useState(0)
  const [cartArray,setcartArray] = useState([])
  const [checkout,setcheckout] = useState(0)
function addToCart(itemDetail){
setcartArray([...cartArray,itemDetail])
setcartshownumber(cartshownumber+1)
}
function goToCheckout(value){
  setcheckout(value)
}
  return (
    <>
    <BrowserRouter>
    <Header cartshownumber = {cartshownumber}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/product" element={
        <ProtectedRoute>
          <ProductManagement />
        </ProtectedRoute>
      } />
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/productdetail/:id' element={<ProductDetail addToCart = {addToCart} />}/>
      <Route path='/checkout' element={<Checkout total={checkout} productsArray={cartArray}/>}/>
      <Route path='/cart' element={<Cart cartItem={cartArray} checkoutFunc={goToCheckout}/>}/>
      <Route path='/orders' element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      }/>
      <Route path="/userslist" element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      } />
      <Route path='/profile' element={<UserProfile/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
