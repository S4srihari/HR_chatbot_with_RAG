// src/components/auth/Auth.jsx
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true) // toggle between login and signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null) // success or error

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Login successful!' })
      setEmail('')
      setPassword('')
    }

    setLoading(false)
  }

 const handleSignup = async (e) => {
  e.preventDefault()
  setLoading(true)
  setMessage(null)

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.includes('already registered')) {
      setMessage({ type: 'error', text: 'User already exists. Please login.' })
    } else {
      setMessage({ type: 'error', text: error.message })
    }
  } else {
    setMessage({ type: 'success', text: 'Signup successful! Check your email.' })
    setEmail('')
    setPassword('')
  }

  setLoading(false)
}


  return (
    <div style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
      <h2>{isLogin ? 'Employee Login' : 'Sign Up'}</h2>

      <form onSubmit={isLogin ? handleLogin : handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (isLogin ? 'Signing in...' : 'Signing up...') : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>

      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green', marginTop: '10px' }}>
          {message.text}
        </p>
      )}

      <p style={{ marginTop: '20px' }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => {
            setIsLogin(!isLogin)
            setMessage(null)
          }}
          style={{ color: '#535bf2', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  )
}
