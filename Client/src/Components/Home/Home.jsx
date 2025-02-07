import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router"

const Home = () => {
  const [productArray, setproductArray] = useState([])

  async function GetAllProducts(){
    const response = await axios.get('http://127.0.0.1:8000/AdminDashboard/GetAllProducts/')
    setproductArray([...response.data])
  }

  useEffect(() => {
    GetAllProducts()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-20 text-green-700 py-8 bg-green-50"> 
        Buy Products from Our Website and Get 20% Discount
      </h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productArray.length > 0 ? (
            productArray.map((value) => (
              <div key={value.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all">
                <Link to={`/productdetail/${value.id}/`}>
                <img src={value.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4"/>
                <h2 className="text-xl font-semibold mb-2">{value.name}</h2>
                <p className="text-gray-600 mb-3">{value.description}</p>
                <code className="text-lg font-bold text-green-600">{value.price}</code>
                </Link>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Home