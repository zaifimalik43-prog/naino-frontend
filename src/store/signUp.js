import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/authStore'

const ADMIN_EMAIL = 'zaifimalik43@gmail.com'

function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = () => {
    if (!name || !email || !password) return setError('Sab fields bharein!')
    if (password.length < 6) return setError('Password kam az kam 6 characters ka hona chahiye!')
    const result = signup(name, email, password)
    if (!result.success) return setError(result.message)
    if (email === ADMIN_EMAIL) navigate('/admin')
    else navigate('/')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white p-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-widest uppercase text-center mb-1">NAINO</h1>
        <p className="text-xs text-gray-400 tracking-widest uppercase text-center mb-8">Create Account</p>

        {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none mb-3"
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSignup()}
          className="w-full border border-gray-300 px-4 py-2 text-sm focus:border-black outline-none mb-4"
        />
        <button
          onClick={handleSignup}
          className="w-full py-3 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-800 transition mb-4"
        >
          Create Account
        </button>
        <p className="text-xs text-center text-gray-400">
          Already account hai?{' '}
          <Link to="/login" className="text-black underline">Login karo</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup