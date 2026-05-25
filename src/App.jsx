import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './store/authStore'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'

const ADMIN_EMAIL = 'zaifimalik43@gmail.com'

function ProtectedAdmin({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App