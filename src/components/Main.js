import { useEffect, useState } from "react";
/* eslint-disable no-undef */

let storage = chrome.storage.local;
let data = {}

const validateCount = (value)=>{
    if(value===undefined){
        return 2
    }
    return value
}

const Main = () => {
    const [uppercaseCount, setUppercaseCount] = useState(0)
    const [lowercaseCount, setLowercaseCount] = useState(0)
    const [digitCount, setDigitCount] = useState(0)
    const [symbolCount, setSymbolCount] = useState(0)
    const [passLength, setPassLength] = useState(0)
    const handleCount = (e, Function, value)=>{
        Function(Number(e.target.value))
        data[value] = Number(e.target.value)
        storage.set(data)
        storage.get(['uppercaseCount', 'lowercaseCount', 'digitCount', 'symbolCount'], (data)=>{
            setPassLength(validateCount(data.uppercaseCount)+validateCount(data.lowercaseCount)+validateCount(data.digitCount)+validateCount(data.symbolCount))
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    useEffect(()=>{
        storage.get(['uppercaseCount', 'lowercaseCount', 'digitCount', 'symbolCount'], (data)=>{
            setUppercaseCount(validateCount(data.uppercaseCount))
            setLowercaseCount(validateCount(data.lowercaseCount))
            setDigitCount(validateCount(data.digitCount))
            setSymbolCount(validateCount(data.symbolCount))
            setPassLength(validateCount(data.uppercaseCount)+validateCount(data.lowercaseCount)+validateCount(data.digitCount)+validateCount(data.symbolCount))
        })
    },[])
    return ( 
        <div className="main">
            <nav>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/></svg>
            </nav>
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <fieldset>
                            <legend>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> UppercaseCount letters <div>Count: <span className="length">{uppercaseCount}</span></div>
                            </legend>
                            <input onChange={(e)=>handleCount(e, setUppercaseCount, 'uppercaseCount')} value={uppercaseCount} type="range" max='100'/>
                        </fieldset>
                        <fieldset>
                            <legend><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> LowercaseCount letters <div>Count: <span className="length">{lowercaseCount}</span></div></legend>
                            <input onChange={(e)=>handleCount(e, setLowercaseCount, 'lowercaseCount')} value={lowercaseCount} type="range" max='100'/>
                        </fieldset>
                        <fieldset>
                            <legend><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> DigitCount <div>Count: <span className="length">{digitCount}</span></div></legend>
                            <input onChange={(e)=>handleCount(e, setDigitCount, 'digitCount')} value={digitCount} type="range" max='100'/>
                        </fieldset>
                        <fieldset>
                            <legend><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> SymbolCount  <div>Count: <span className="length">{symbolCount}</span></div></legend>
                            <input name="symbolCount" onChange={(e)=>handleCount(e, setSymbolCount, 'symbolCount')} value={symbolCount} type="range" max='100'/>
                        </fieldset>
                    </div>
                    <div className="checkboxes">
                        <label><input type="checkbox" name="length"/>  Random Length</label>
                        <label><input type="checkbox" />  Random Charactors</label>
                    </div>
                    <div className="result">
                        <label htmlFor="result">Password <div>Length: <span className="length">{passLength}</span></div></label>
                        <div className="password">
                            <input type="input" max='100'/>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        </div>
                    </div>
                    <button>Generate</button>
                </form>

            </main>
        </div>
    );
}

export default Main;