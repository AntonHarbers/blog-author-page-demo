interface LogInProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogOut({ setLoggedIn }: LogInProps) {

    const HandleLogOut = () => {
        // delete token from local storage
        localStorage.setItem('JWT', '');
        // set session state to false
        setLoggedIn(false)
    }

    return (
        <div className="absolute top-3 right-3 ">
            <button onClick={HandleLogOut} className="bg-red-200 p-3 rounded-md hover:bg-red-400 transition-all duration-75 active:bg-red-300">Log Out</button>
        </div>
    )
}
