import axios from "axios";
import { useState,useEffect } from "react";
const OrderDetails = () => {
    const [orders,setOrder] = useState([])
    async function GetAllOrders(){
        const response = await axios.get('http://localhost:8000/AdminDashboard/GetAllOrders/')
        setOrder(response.data)
    }
    useEffect( ()=> {
        GetAllOrders();
    } ,[])
    return (
        <>
        {
            orders.length>0 ?
            (
                <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Order Dashboard</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left border-b font-medium">Order ID</th>
                        <th className="p-4 text-left border-b font-medium">Customer</th>
                        <th className="p-4 text-left border-b font-medium">Products</th>
                        <th className="p-4 text-right border-b font-medium">Total Price</th>
                        <th className="p-4 text-left border-b font-medium">Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="p-4 border-b">#{order.id}</td>
                          <td className="p-4 border-b">{order.username}</td>
                          <td className="p-4 border-b">
                            {order.products.map((product) => (
                              <div key={product.id} className="mb-2 last:mb-0">
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.description}</div>
                                <div className="text-sm text-gray-600">Rs. {product.price}</div>
                              </div>
                            ))}
                          </td>
                          <td className="p-4 border-b text-right font-medium">
                            Rs. {order.total_price}
                          </td>
                          <td className="p-4 border-b text-gray-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
                <div className="p-8 text-center text-gray-500">No Orders Placed</div>
            )
            
        }
        </>

    );
  };
  
  export default OrderDetails;