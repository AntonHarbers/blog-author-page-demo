import { useState } from "react"

interface LogInProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogIn({ setLoggedIn }: LogInProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function HandleLogIn(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        const options = {
            username: username,
            password: password,
        }

        console.log(JSON.stringify(options))

        const response = await fetch('http://localhost:3000/auth/log-in', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options),
        })
        const data = await response.json()

        // if it returns a token, save that token to local storage and set is logged in to true
        // on startup, if a local token exists, try to see if its still valid with the session route
        // if it is then log in
        // if it isnt then do nothing
        console.log(data.token)

        if (data.token) {
            setLoggedIn(true)
            localStorage.setItem('JWT', data.token)
        }
        //setLoggedIn(true)
    }


    return (
        <div className="flex w-[100vw] h-[100vh]" >
            <form className="flex flex-col gap-5 justify-center m-auto" action="http://localhost:3000/log-in" method="POST">
                <h1 className="text-3xl text-center">Please Log In</h1>
                <label className="text-xl text-center" htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.currentTarget.value)} type="text" name="username" className=" p-2 border border-gray-300 text-xl text-center rounded-md " placeholder="Enter your username.." />
                <label className="text-xl text-center" htmlFor="username">Password</label>
                <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" name="password" className="p-2 border border-gray-300 text-xl text-center rounded-md " placeholder="Enter your password.." />
                <button onClick={HandleLogIn} className=" border  p-5 hover:border-slate-400 rounded-md bg-green-100 hover:bg-green-300 active:bg-green-200" type="submit">Log In</button>
            </form>
        </div>
    )
}

