import { useEffect, useState } from 'react'

import LogIn from './components/LogIn'
import Posts from './components/Posts'
import LogOut from './components/LogOut';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');
    const CheckSession = async () => {
      const response = await fetch('http://localhost:3000/auth/session', {
        method: 'GET',
        mode: 'cors',
        headers: { "Authorization": `Bearer ${JWT}` }
      })
      const data = await response.json()

      if (!data.expiresIn) {
        setLoggedIn(false)
        return
      }

      if (data.message == 'You are signed in.' && data.admin == true) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
        return;
      }

      setSessionTimer(data.expiresIn)
    }

    CheckSession().catch((e) => console.log(e));
  }, [])

  const ToggleNewPostForm = () => {
    setIsCreatingPost(!isCreatingPost)
  }

  return (
    <>
      {!loggedIn ? <div>
        <LogIn setLoggedIn={setLoggedIn} />
      </div> : <div className='flex flex-col bg-slate-200 h-[100vh] w-full justify-center items-center'>
        <LogOut setLoggedIn={setLoggedIn} />
        <button className='absolute top-3 left-3 bg-green-300 p-3 rounded-sm hover:bg-green-500 active:bg-green-300' onClick={ToggleNewPostForm}>Create Post</button>
        <Posts isCreatingPost={isCreatingPost} setIsCreatingPost={setIsCreatingPost} />
        <div className='w-full text-center absolute bottom-0'>{sessionTimer} until session expires</div>
      </div>}
    </>
  )
}

export default App
