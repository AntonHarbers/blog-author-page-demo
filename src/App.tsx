import { useState } from 'react'

import LogIn from './components/logIn'


function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <>
      {!loggedIn ? <div>
        <LogIn />
      </div> : <div></div>}
    </>
  )
}

export default App
