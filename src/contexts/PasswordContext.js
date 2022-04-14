import { createContext, useEffect, useReducer, useState } from "react";
import { PasswordReducer } from "../reducers/PasswordReducer";

export const PasswordContext = createContext() 

const PasswordContextProvider = ( props ) => {
    const [password, dispatch] = useReducer(PasswordReducer, [], ()=>{
        const data = localStorage.getItem('passwords_list')
        return data?JSON.parse(data):[]
    })
    useEffect(()=>{
        localStorage.setItem('passwords_list', JSON.stringify(password))
    },[password])
    return ( 
        <PasswordContext.Provider value = {{password, dispatch}} >
            {props.children}
        </PasswordContext.Provider>
    );
}

export default PasswordContextProvider;