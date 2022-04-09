import { useState } from "react";


const Password = ({password, id, dispatch, checked }) => {
    const [isHovered, setIsHovered] = useState(false)
    const handleCheck = ()=>{
        const checkbox = document.querySelectorAll('.checkbox')
        checkbox.forEach(check=>{
            if(check.checked){
                checked(true)
            }
        })
        checked(false)
        
    }
    return (  
        <div id={id} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className="passwords" >
            <div className="passwods_body">
                <label>
                    <input onChange={handleCheck} className='checkbox' type="checkbox" />
                    {password}
                </label>
                {isHovered&&
                    <div className="toolbar">
                        <svg onClick={()=>navigator.clipboard.writeText(password)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        <svg onClick={()=>dispatch({type:'REMOVE_PASSWORD', id})} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                    </div>
                }
            </div>
            <div className="passwords_footer">
                <p>Created: <span>Time</span></p>
            </div>
        </div>
    );
}

export default Password;