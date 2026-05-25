import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProducts } from '../api/index'
import { useCart } from '../store/cartStore'

const categories = [
  { name: 'Shirts', count: '18 Products' },
  { name: 'Pants', count: '12 Products' },
  { name: 'Tracksuits', count: '9 Products' },
  { name: 'Jeans', count: '6 Products' },
]

function Home() {
  const { addItem } = useCart()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[90vh] bg-black flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">New Collection 2025</p>
        <h1 className="text-7xl font-bold tracking-widest mb-6">NAINO</h1>
        <p className="text-sm tracking-widest uppercase text-gray-300 mb-10">
          Made in Pakistan — For the Modern Man
        </p>
        <div className="flex gap-4">
          <Link to="/shop" className="px-8 py-3 bg-white text-black text-xs tracking-widest uppercase hover:bg-gray-200 transition">
            Shop Now
          </Link>
          <Link to="/shop" className="px-8 py-3 border border-white text-white text-xs tracking-widest uppercase hover:bg-white hover:text-black transition">
            Explore
          </Link>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-center py-3 text-xs tracking-widest uppercase">
        Free Delivery on Orders Above Rs. 3,000 — Made in Pakistan 🇵🇰
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold tracking-widest uppercase text-center mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="border border-black p-8 text-center cursor-pointer hover:bg-black hover:text-white transition group"
            >
              <h3 className="text-sm font-bold tracking-widest uppercase mb-2">{cat.name}</h3>
              <p className="text-xs tracking-wider text-gray-500 group-hover:text-gray-300">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products — Backend se */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <h2 className="text-2xl font-bold tracking-widest uppercase text-center mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="cursor-pointer group">
              <div className="w-full h-64 bg-gray-100 border border-gray-200 group-hover:border-black transition overflow-hidden">
                <img
                  src={`/images/products/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-400 tracking-widest uppercase">{product.category}</p>
                <h3 className="text-sm font-bold tracking-wide mt-1">{product.name}</h3>
                <p className="text-sm mt-1">Rs. {product.price.toLocaleString()}</p>
                <button
                  onClick={() => addItem(product)}
                  className="mt-3 w-full py-2 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Strip */}
      <div className="w-full bg-black text-white py-16 px-8 mt-16 text-center">
        <h2 className="text-3xl font-bold tracking-widest uppercase mb-4">Made in Pakistan</h2>
        <p className="text-sm text-gray-400 tracking-wider max-w-xl mx-auto">
          NAINO is built on the craft and pride of Pakistani artisans. Every piece is designed for the modern Pakistani man — quality you can feel, style you can own.
        </p>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-8 px-8 flex justify-between items-center text-xs tracking-widest uppercase text-gray-400">
        <span>© 2025 NAINO</span>
        <span>Made in Pakistan 🇵🇰</span>
      </footer>
    </div>
  )
}

export default Home