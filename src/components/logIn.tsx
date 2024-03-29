import { useState } from "react"
import { LogInProps } from "../types";


export default function LogIn({ setLoggedIn }: LogInProps) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([''])

    async function HandleLogIn(e: React.MouseEvent<HTMLElement>) {

        e.preventDefault();
        // Validation
        if (username.length < 1) {
            setErrors(['Username must not be empty'])
            return;
        } else if (password.length < 6) {
            setErrors(['Password must be at least 6 characters long'])
            return;
        }

        //options for fetch body
        const options = {
            username: username,
            password: password,
        }

        // fetch call
        const response = await fetch(`${import.meta.env.VITE_API_PATH}auth/log-in`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options),
        })

        const data = await response.json()

        if (data.token && data.admin) {
            setLoggedIn(true)
            localStorage.setItem(import.meta.env.VITE_JWT, data.token)
        } else {
            if (data.token) { setErrors(['You are not an admin']) } else { setErrors([data]) }
        }
    }

    return (
        <div className="flex w-[100vw] h-[100vh]" >
            <form
                className="flex flex-col gap-5 justify-center m-auto"
                action="http://localhost:3000/log-in"
                method="POST"
            >
                <h1 className="text-3xl text-center">Please Log In</h1>
                <label
                    className="text-xl text-center"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    type="text"
                    name="username"
                    className=" p-2 border border-gray-300 text-xl text-center rounded-md "
                    placeholder="Enter your username.."
                />
                <label
                    className="text-xl text-center"
                    htmlFor="username"
                >
                    Password
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                    name="password"
                    className="p-2 border border-gray-300 text-xl text-center rounded-md"
                    placeholder="Enter your password.."
                />
                <button
                    onClick={HandleLogIn}
                    className=" border  p-5 hover:border-slate-400 rounded-md bg-green-100 hover:bg-green-300 active:bg-green-200"
                    type="submit"
                >
                    Log In
                </button>
                {errors.map((err) => {
                    return <div key={err}>{err}</div>
                })}
            </form>
        </div>
    )
}
