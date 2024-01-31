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

    // send session request to api
    // if session is logged in then display log in
    // retry this every couple of minutes
    if (JWT != '') {
      setLoggedIn(true)
    }
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
