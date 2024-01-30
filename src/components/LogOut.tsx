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
        <div>
            <button onClick={HandleLogOut}>Log Out</button>
        </div>
    )
}
