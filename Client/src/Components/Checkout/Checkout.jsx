/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Checkout = ({total,productsArray}) => {
  const navigate = useNavigate();
  async function handlePlaceOrder(){
    const user = JSON.parse(localStorage.getItem('userdata'));
    const products = productsArray.map( (value) => (
      value.id
    ) )
    const totalPrice = total
    const orderData = {
      username: user.username,
      products: products,
      total_price: totalPrice,
    };
    await axios.post('http://localhost:8000/AdminDashboard/bookorder/', orderData).then( () => alert('Order Booked Successfully') ).catch((err) =>{console.log(err)
    })
  }
    return (
      <>
      {
        total==0?
        (<div className="p-8 text-center text-gray-500">Your cart is empty</div>) 
        :
        (
          <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Order Summary</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Sub Total</span>
            <span className="font-semibold">Rs : {total} </span>
          </div>
  
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Charges</span>
            <span className="text-red-500">Rs. 99</span>
          </div>
  
          
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold text-gray-700">Total bill</span>
            <span className="font-bold">Rs. {99+total} </span>
          </div>
        </div>
  
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="bg-white rounded-lg shadow">
            <button className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50">
              <span className="font-medium">CASH ON DELIVERY (COD)</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        {
          localStorage.getItem('userdata')?
        <button className="w-full mt-8 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 flex items-center justify-between px-6"
        onClick={ handlePlaceOrder } >
          <span className="font-semibold">PLACE ORDER</span>
          <span className="font-bold">RS. {total+99}</span>
        </button>
        :
        <button className="w-full mt-8 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 flex items-center justify-between px-6"
        onClick={ () => navigate('/signup') }>
          <span className="font-semibold">SIGN IN TO PLACE ORDER</span>
          <span className="font-bold">RS. {total+99}</span>
        </button>
        }
        <button className="w-full mt-8 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 flex items-center justify-between px-6"onClick={ () => navigate('/') } >
          <span className="font-semibold">Continue Shopping</span>
        </button>
      </div>
        )
      }

      </>

    );
  }
  
  export default Checkout;