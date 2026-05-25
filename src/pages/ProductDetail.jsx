import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProduct } from '../api/index'
import { useCart } from '../store/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    getProduct(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-xs tracking-widest uppercase text-gray-400">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-16">
        <button
          onClick={() => navigate(-1)}
          className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition mb-10"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="w-full h-[500px] bg-gray-100 border border-gray-200 overflow-hidden">
            <img
              src={`/images/products/${encodeURIComponent(product.image)}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">{product.category}</p>
            <h1 className="text-4xl font-bold tracking-widest uppercase mb-4">{product.name}</h1>
            <p className="text-2xl font-bold mb-8">Rs. {product.price.toLocaleString()}</p>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Premium quality {product.name.toLowerCase()} crafted with the finest materials.
                Designed for the modern Pakistani man — comfortable, stylish, and made to last.
              </p>
            </div>

            <button
              onClick={() => addItem(product)}
              className="mt-8 w-full py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <p className="mt-4 text-xs text-center text-gray-400 tracking-widest uppercase">
              Free Delivery on Orders Above Rs. 3,000
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-gray-200 py-8 px-8 mt-16 flex justify-between items-center text-xs tracking-widest uppercase text-gray-400">
        <span>© 2025 NAINO</span>
        <span>Made in Pakistan 🇵🇰</span>
      </footer>
    </div>
  )
}

export default ProductDetail