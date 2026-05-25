import { Link } from 'react-router-dom'
import { useCart } from '../store/cartStore'

function Navbar() {
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="w-full bg-white border-b border-black px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex flex-col items-center leading-none">
        <span className="text-2xl font-bold tracking-widest">NA</span>
        <div className="w-full h-px bg-black my-1"></div>
        <span className="text-2xl font-bold tracking-widest">NO</span>
      </Link>

      {/* Nav Links */}
      <div className="flex gap-8 text-sm tracking-widest uppercase items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <Link to="/cart" className="hover:underline flex items-center gap-1">
          Cart
          {totalItems > 0 && (
            <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar