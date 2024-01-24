import { useState } from 'react'

import LogIn from './components/LogIn'
import Posts from './components/Posts'
import NewPostForm from './components/NewPostForm';

function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <>
      {!loggedIn ? <div>
        <LogIn setLoggedIn={setLoggedIn} />
      </div> : <div>
        <Posts />
        <NewPostForm /></div>}
    </>
  )
}

export default App
