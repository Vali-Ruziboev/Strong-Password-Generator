import { createContext, useEffect, useReducer, useState } from "react";
import { PasswordReducer } from "../reducers/PasswordReducer";
/* eslint-disable no-undef */
export const PasswordContext = createContext() 

function getAllStorageSyncData() {
    // Immediately return a promise and start asynchronous work
    return new Promise((resolve, reject) => {
      // Asynchronously fetch all data from storage.sync.
      chrome.storage.local.get(null, (items) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        // Pass the data retrieved from storage down the promise chain.
        console.log(items);
      });
    });
  }

const PasswordContextProvider = ( props ) => {
    const [pass, setPass] = useState([])
    useEffect(()=>{
        chrome.storage.local.get(['passwords_list'], (d)=>{
            console.log(d.passwords_list);
            getAllStorageSyncData();
            if(d.passwords_list){
                setPass(d.passwords_list)
            }
        })
    },[])
    const [password, dispatch] = useReducer(PasswordReducer, [], ()=>{
        return pass
    })
    useEffect(()=>{
        chrome.storage.local.set({'passwords_list': password})
    })
    return ( 
        <PasswordContext.Provider value = {{password, dispatch}} >
            {props.children}
        </PasswordContext.Provider>
    );
}

export default PasswordContextProvider;