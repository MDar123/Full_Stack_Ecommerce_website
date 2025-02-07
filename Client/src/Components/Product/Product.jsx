import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null
    });

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/AdminDashboard/GetAllProducts/');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        console.log(e.target)
        const { name, value, files } = e.target;
        console.log(name,value,files)
        if (name === 'image' && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Add new product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            await axios.post('http://localhost:8000/AdminDashboard/GetAllProducts/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            getAllProducts();
            setIsModalOpen(false);
            setFormData({ name: '', description: '', price: '', image: null });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Update product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            await axios.put(`http://localhost:8000/AdminDashboard/GetProductById/${editingProduct.id}/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            getAllProducts();
            setIsModalOpen(false);
            setEditingProduct(null);
            setFormData({ name: '', description: '', price: '', image: null });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete product
    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8000/AdminDashboard/GetProductById/${id}/`);
                getAllProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Open modal for editing
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: null
        });
        setIsModalOpen(true);
    };

    return (
        <>
        {
            products.length > 0 ?
            (
                <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mb-6">Admin Product Dashboard</h2>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setFormData({ name: '', description: '', price: '', image: null });
                            setIsModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add New Product
                    </button>
                </div>
    
                {/* Products Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left border-b font-medium">Image</th>
                                <th className="p-4 text-left border-b font-medium">Name</th>
                                <th className="p-4 text-left border-b font-medium">Description</th>
                                <th className="p-4 text-right border-b font-medium">Price</th>
                                <th className="p-4 text-center border-b font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="p-4 border-b">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-4 border-b">{product.name}</td>
                                    <td className="p-4 border-b">{product.description}</td>
                                    <td className="p-4 border-b text-right">Rs. {product.price}</td>
                                    <td className="p-4 border-b text-center">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    
                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        accept="image/*"
                                        {...(!editingProduct && { required: true })}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setEditingProduct(null);
                                        }}
                                        className="px-4 py-2 border rounded hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        {editingProduct ? 'Update' : 'Add'} Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            ):(
                <div className="p-8 text-center text-gray-500">You have not added any product</div>
            )
        }
        </>

    );
};

export default ProductManagement;