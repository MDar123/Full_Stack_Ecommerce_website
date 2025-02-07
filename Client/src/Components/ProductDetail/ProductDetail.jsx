import axios from "axios"
import { useParams } from "react-router"
import {useEffect ,useState} from "react"
import {Link} from 'react-router-dom'
const ProductDetail = ({addToCart}) => {
    const [product, setproduct] = useState({})
    const {id} = useParams()
    async function getProductById(){
        const response =await axios.get(`http://127.0.0.1:8000/AdminDashboard/GetProductById/${id}/`)
        setproduct(response.data)  
    }
    useEffect( () => {
        getProductById()
    } ,[])
    return (
        <>
            {
                product!==''?
                            <div className="container mx-auto px-4 py-8">
                            <div className="flex flex-col md:flex-row gap-8">
                              <div className="md:w-1/2">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-2/3 rounded-lg shadow-lg"
                                />
                              </div>
                  
                              <div className="md:w-1/2">
                                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                                <p className="text-2xl text-green-600 font-bold mb-4">{product.price}</p>
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                  <p className="text-gray-600">{product.description}</p>
                                </div>
                                <Link>
                                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                                onClick={ () => {addToCart(product)} }>
                                    Add to Cart
                                </button>
                                </Link>
                              </div>
                            </div>
                          </div>:null
            }

        </>

      )
}

export default ProductDetail