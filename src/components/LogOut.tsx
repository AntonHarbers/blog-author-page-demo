import { LogInProps } from "../types";

export default function LogOut({ setLoggedIn }: LogInProps) {

    const HandleLogOut = () => {
        localStorage.setItem(import.meta.env.VITE_JWT, '');
        setLoggedIn(false)
    }

    return (
        <div className="fixed top-3 right-3 text-xl ">
            <button
                onClick={HandleLogOut}
                className="bg-red-200 p-3 rounded-md hover:bg-red-400 transition-all duration-75 active:bg-red-300"
            >
                Log Out
            </button>
        </div>
    )
}
