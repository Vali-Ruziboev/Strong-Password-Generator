import { Link } from "react-router-dom";
import Password from "./Password";
import { PasswordContext } from "../contexts/PasswordContext";
import { useContext } from "react";

const History = () => {
    const {password, dispatch} = useContext(PasswordContext)
    return ( 
    <div className="main">
        <nav className="back">
            <Link  to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            </Link>
        </nav>
        <main>
        {password.map(pass=>{
            return(
                <Password key={pass.id} id={pass.id} password={pass.password} />
            )
        })}
        </main>
    </div> );
}

export default History;