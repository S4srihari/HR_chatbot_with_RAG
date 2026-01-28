import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import Login from './components/login/login'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) return <Login />

  return( <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to HR Chatbot</h1>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>
    </div>
  )
}

export default App
