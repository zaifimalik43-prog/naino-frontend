import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/authStore'

const ADMIN_EMAIL = 'zaifimalik43@gmail.com'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email || !password) return setError('Sab fields bharein!')
    const result = login(email, password)
    if (!result.success) return setError(result.message)
    if (email === ADMIN_EMAIL) navigate('/admin')
    else navigate('/')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white p-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-center mb-1">NAINO</h1>
        <p className="text-xs text-gray-400 tracking-widest uppercase text-center mb-8">Login</p>

        {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition mb-4"
        >
          Login
        </button>
        <p className="text-xs text-center text-gray-400">
          Account nahi hai?{' '}
          <Link to="/signup" className="text-black underline">Signup karo</Link>
        </p>
      </div>
    </div>
  )
}

export default Login