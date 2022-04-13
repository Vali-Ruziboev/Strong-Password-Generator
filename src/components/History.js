import { Link } from "react-router-dom";
import Password from "./Password";
import { PasswordContext } from "../contexts/PasswordContext";
import { useContext, useEffect, useState } from "react";

/* eslint-disable no-undef */

let storage = chrome.storage.local;
let data = {}

const History = () => {
    const {password, dispatch} = useContext(PasswordContext)
    const [checked, setChecked] = useState(false)
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [saveHistory, setSaveHistory] = useState(true)
    const handleSelectAll = ()=>{
        const checkbox = document.querySelectorAll('.checkbox')
        if(isAllSelected){
            checkbox.forEach(check=>{
                check.checked = false
            })
            setIsAllSelected(false)
            setChecked(false)
        }else{
            checkbox.forEach(check=>{
                check.checked = true
            })
            setIsAllSelected(true)
        }
    }
    const handleDeleteAll = ()=>{
        const checkbox = document.querySelectorAll('.checkbox')
        checkbox.forEach(check=>{
            if(check.checked===true){
                dispatch({type:"REMOVE_PASSWORD", id:check.parentNode.parentNode.parentNode.id})
            }
        })
    }
    const handleCopyAll = ()=>{
        const checkbox = document.querySelectorAll('.checkbox')
        const passList = []
        checkbox.forEach(check=>{
            if(check.checked===true){
                passList.push(check.parentNode.textContent)
            }
        })
        navigator.clipboard.writeText(passList.join(', '))
    }
    useEffect(()=>{
        storage.get(['history'], (d)=>{
            if(d.history!==undefined){
                setSaveHistory(d.history)
            }
        })
    },[])
    return ( 
    <div className="main extpad">
        <nav className="back">
            <Link  to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            </Link>
            <label  className="historyCheck">History <input checked={saveHistory} onClick={(e)=>{return(setSaveHistory(!saveHistory), data['history']=!saveHistory, storage.set(data))}} type="checkbox" /></label>
        </nav>
        <main>
        {password.sort((a,b)=>b.date.toString().localeCompare(a.date.toString())).map(pass=>{
            return(
                <Password key={pass.id} id={pass.id} password={pass.password} date={pass.date} dispatch={dispatch} checked={setChecked}/>
            )
        })}
        </main>
        {checked&&
            <footer>
                <div onClick={handleSelectAll} className="select_all">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>
                    Select All
                </div>
                <div onClick={handleDeleteAll} className="delete_all">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                    Delete
                </div>
                <div onClick={handleCopyAll} className="copy_all">
                    <svg onClick={()=>navigator.clipboard.writeText(password)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                    Copy
                </div>
            </footer>
        }
    </div> );
}

export default History;