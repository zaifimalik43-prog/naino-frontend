import Navbar from '../components/Navbar'
import { useCart } from '../store/cartStore'

function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCart()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold tracking-widest uppercase mb-10">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 tracking-widest uppercase text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-6 border-b border-gray-200 py-6">
                <img
                  src={`/images/products/${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <p className="text-xs text-gray-400 tracking-widest uppercase">{item.category}</p>
                  <h3 className="font-bold tracking-wide mt-1">{item.name}</h3>
                  <p className="text-sm mt-1">Rs. {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
                  >
                    -
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm font-bold w-24 text-right">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-black transition text-xs tracking-widest uppercase"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition"
              >
                Clear Cart
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">Total</p>
                <p className="text-2xl font-bold">Rs. {total.toLocaleString()}</p>
                <button className="mt-4 px-8 py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart