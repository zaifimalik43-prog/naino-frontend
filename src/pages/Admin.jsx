import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://naino-backend-production.up.railway.app'

function Admin() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProducts = () => {
    axios.get(`${API_URL}/admin/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (editId) {
        await axios.put(`${API_URL}/admin/products/${editId}`, {
          ...form,
          price: parseFloat(form.price)
        })
      } else {
        await axios.post(`${API_URL}/admin/products`, {
          ...form,
          price: parseFloat(form.price)
        })
      }
      setForm({ name: '', price: '', category: '', image: '' })
      setEditId(null)
      fetchProducts()
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image
    })
    setEditId(product.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete karna chahte ho?')) {
      await axios.delete(`${API_URL}/admin/products/${id}`)
      fetchProducts()
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="w-full bg-black text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest uppercase">NAINO Admin</h1>
        <button
          onClick={() => navigate('/')}
          className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition"
        >
          ← Back to Site
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Add/Edit Form */}
        <div className="border border-black p-8 mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-6">
            {editId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
            />
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
            >
              <option value="">Select Category</option>
              <option value="Shirts">Shirts</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Tracksuits">Tracksuits</option>
              <option value="Jeans">Jeans</option>
            </select>
            <input
              type="text"
              placeholder="Image filename (e.g. shirt1.jpg)"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-2 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition"
            >
              {loading ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
            </button>
            {editId && (
              <button
                onClick={() => { setEditId(null); setForm({ name: '', price: '', category: '', image: '' }) }}
                className="px-8 py-2 border border-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Products Table */}
        <h2 className="text-sm font-bold tracking-widest uppercase mb-6">
          All Products ({products.length})
        </h2>
        <div className="border border-gray-200">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex items-center gap-4 px-6 py-4 ${index !== products.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <img
                src={`/images/products/${encodeURIComponent(product.image)}`}
                alt={product.name}
                className="w-16 h-16 object-cover border border-gray-200"
              />
              <div className="flex-1">
                <p className="text-xs text-gray-400 tracking-widest uppercase">{product.category}</p>
                <h3 className="font-bold tracking-wide">{product.name}</h3>
                <p className="text-sm">Rs. {product.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-1 border border-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-4 py-1 border border-red-500 text-red-500 text-xs tracking-widest uppercase hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin