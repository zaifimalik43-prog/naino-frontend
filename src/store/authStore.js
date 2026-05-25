import { create } from 'zustand'

const ADMIN_EMAIL = 'zaifimalik43@gmail.com'

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem('naino_user')) || null,

  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('naino_users')) || []
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'Wrong email or password!' }
    localStorage.setItem('naino_user', JSON.stringify(found))
    set({ user: found })
    return { success: true, isAdmin: email === ADMIN_EMAIL }
  },

  signup: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('naino_users')) || []
    if (users.find(u => u.email === email)) return { success: false, message: 'Email already registered!' }
    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('naino_users', JSON.stringify(users))
    localStorage.setItem('naino_user', JSON.stringify(newUser))
    set({ user: newUser })
    return { success: true, isAdmin: email === ADMIN_EMAIL }
  },

  logout: () => {
    localStorage.removeItem('naino_user')
    set({ user: null })
  }
}))