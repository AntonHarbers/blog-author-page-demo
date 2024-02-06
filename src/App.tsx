import { useEffect, useState } from 'react'

import LogIn from './components/LogIn'
import Posts from './components/Posts'
import LogOut from './components/LogOut';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    const JWT = localStorage.getItem(import.meta.env.VITE_JWT);

    const CheckSession = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_PATH}auth/session`, {
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
  }, [loggedIn])

  return (
    <div className=' overflow-hidden '>
      {!loggedIn
        ?
        <div>
          <LogIn setLoggedIn={setLoggedIn} />
        </div>
        :
        <div className='flex flex-col  min-h-[100vh] w-[100vw] p-10'>
          <div className=' text-3xl black w-full text-center mb-10'>Author Blog Home</div>
          <LogOut setLoggedIn={setLoggedIn} />
          <button
            className='fixed top-3 w-[250px] left-3 text-xl bg-green-300 p-3 rounded-md hover:bg-green-500 active:bg-green-300 transition-all'
            onClick={() => setIsCreatingPost(!isCreatingPost)}>
            Create New Post
          </button>
          <Posts isCreatingPost={isCreatingPost} setIsCreatingPost={setIsCreatingPost} />
          <div className=' fixed bottom-3 left-3'>
            {sessionTimer} until session expires
          </div>
        </div>}
    </div>
  )
}

export default App
