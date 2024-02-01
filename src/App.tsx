import { useEffect, useState } from 'react'

import LogIn from './components/LogIn'
import Posts from './components/Posts'
import NewPostForm from './components/NewPostForm';
import LogOut from './components/LogOut';

function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');

    const CheckSession = async () => {
      const response = await fetch('http://localhost:3000/auth/session', {
        method: 'GET',
        mode: 'cors',
        headers: { "Authorization": `Bearer ${JWT}` }
      })
      const data = await response.json()

      if (data.message == 'You are signed in.' && data.admin == true) {
        setLoggedIn(true)
      }
      console.log(data)
    }

    CheckSession().catch((e) => console.log(e));




    // send session request to api
    // if session is logged in then display log in
    // retry this every couple of minutes
  }, [])

  useEffect(() => {
    console.log('yes')
  }, [])

  return (
    <>
      {!loggedIn ? <div>
        <LogIn setLoggedIn={setLoggedIn} />
      </div> : <div>
        <LogOut setLoggedIn={setLoggedIn} />
        <Posts />
        <NewPostForm /></div>}
    </>
  )
}

export default App
