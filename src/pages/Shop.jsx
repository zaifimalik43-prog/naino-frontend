import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProducts } from '../api/index'
import { useCart } from '../store/cartStore'

const categoryFilters = ['All', 'Shirts', 'Bottoms']

function Shop() {
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Header */}
      <div className="w-full bg-black text-white text-center py-16">
        <h1 className="text-5xl font-bold tracking-widest uppercase">Shop</h1>
        <p className="text-xs tracking-widest uppercase text-gray-400 mt-3">
          All Products — Made in Pakistan
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-8 py-8 flex gap-4">
        {categoryFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 text-xs tracking-widest uppercase border transition ${
              activeCategory === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black hover:bg-black hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-8 py-4">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-8">
          {filtered.length} Products
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="w-full h-72 bg-gray-100 border border-gray-200 group-hover:border-black transition overflow-hidden">
                <img
                  src={`/images/products/${encodeURIComponent(product.image)}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-400 tracking-widest uppercase">{product.category}</p>
                <h3 className="text-sm font-bold tracking-wide mt-1">{product.name}</h3>
                <p className="text-sm mt-1">Rs. {product.price.toLocaleString()}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); addItem(product) }}
                  className="mt-3 w-full py-2 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-8 px-8 mt-16 flex justify-between items-center text-xs tracking-widest uppercase text-gray-400">
        <span>© 2025 NAINO</span>
        <span>Made in Pakistan 🇵🇰</span>
      </footer>
    </div>
  )
}

export default Shop