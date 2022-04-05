import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import useForceUpdate from "use-force-update";
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
    const [uppercaseCount, setUppercaseCount] = useState(2)
    const [lowercaseCount, setLowercaseCount] = useState(2)
    const [digitCount, setDigitCount] = useState(2)
    const [symbolCount, setSymbolCount] = useState(2)
    const [passLength, setPassLength] = useState(8)
    const [passInputLength, setPassInputLength] = useState(0)
    const [randomPass, setRandomPass] = useState('')
    const [isRandom, setIsRandom] = useState(false)

    const [validator] = useState(new SimpleReactValidator());
    const forceUpdate = useForceUpdate();

    // Write the changes to storage
    const handleCount = (e, value, Function)=>{
        if(Function){
            Function(Number(e))
        }
        data[value] = Number(e)
        storage.set(data)
        storage.get(['uppercaseCount', 'lowercaseCount', 'digitCount', 'symbolCount'], (data)=>{
            setPassLength(validateCount(data.uppercaseCount)+validateCount(data.lowercaseCount)+validateCount(data.digitCount)+validateCount(data.symbolCount))
        })
    }
    const generateUpperCase =()=>{
        const random = Math.floor(Math.random()*26)+65
        return String.fromCharCode(random)
    }
    const generateLowerCase =()=>{
        const random = Math.floor(Math.random()*26)+97
        return String.fromCharCode(random)
    }
    const generateDigit = ()=>{
        const random = Math.floor(Math.random()*10)+48
        return String.fromCharCode(random)
    }
    const generateSymbol = ()=>{
        const symbolsArr = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58,59,60,61,62,63,64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126]
        return String.fromCharCode(symbolsArr[Math.floor(Math.random()*symbolsArr.length)])
    }
    const generateRandomPass = (uppercaseCount, lowercaseCount, digitCount, symbolCount)=>{
        let passArr = []
        const occurrence = (element, Function, array)=>{
            if(element){
                for(let i=0; i<element; i++){
                    array.push(Function())
                }
            }
        }
        occurrence(uppercaseCount, generateUpperCase, passArr)
        occurrence(lowercaseCount, generateLowerCase, passArr)
        occurrence(digitCount, generateDigit, passArr)
        occurrence(symbolCount, generateSymbol, passArr)
        const shuffleArray = array => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
          }
        shuffleArray(passArr)
        return passArr.join('')
    }

    // Refs for Password input
    const inputpass = useRef()
    // Ref for Random Checkbox
    const random = useRef()
    // Upper Case range
    const upperCaseRef = useRef()
    // Lower Case range
    const lowerCaseRef = useRef()
    // Digits range
    const digitsRef = useRef()
    // Symbols range
    const symbolsRef = useRef()

    // generates random number between 2 and 12
    const randomCount = ()=>Math.floor((Math.random()*10)+2)

    // Function for Generate Button
    const handleSubmit = (e)=>{
        e.preventDefault()
            if(isRandom){
                const f = randomCount()
                const s = randomCount()
                const t = randomCount()
                const r = randomCount()
                setUppercaseCount(f)
                setLowercaseCount(s)
                setDigitCount(t)
                setSymbolCount(r) 
                handleCount(f, 'uppercaseCount', null)
                handleCount(s, 'lowercaseCount', null)
                handleCount(t, 'digitCount', null)
                handleCount(r, 'symbolCount', null)
                const password = generateRandomPass(f, s, t, r)
                setRandomPass(password)
                setPassInputLength(validateCount(f)+validateCount(s)+validateCount(t)+validateCount(r))   
            }else{
                if(validator.allValid()) {
                    const password = generateRandomPass(uppercaseCount, lowercaseCount, digitCount, symbolCount)
                    setRandomPass(password)
                    setPassInputLength(validateCount(uppercaseCount)+validateCount(lowercaseCount)+validateCount(digitCount)+validateCount(symbolCount))
                }else{
                    validator.showMessages();
                    forceUpdate();
                }
            }
        
    }

    // Get all data from storage before render
    useEffect(()=>{
        storage.get(['uppercaseCount', 'lowercaseCount', 'digitCount', 'symbolCount', 'isRandom'], (data)=>{
            setUppercaseCount(validateCount(data.uppercaseCount))
            setLowercaseCount(validateCount(data.lowercaseCount))
            setDigitCount(validateCount(data.digitCount))
            setSymbolCount(validateCount(data.symbolCount))
            setPassLength(validateCount(data.uppercaseCount)+validateCount(data.lowercaseCount)+validateCount(data.digitCount)+validateCount(data.symbolCount))

                // check if random checkbox is checked or not
                if(data.isRandom === undefined){
                    data['isRandom'] = isRandom
                    storage.set(data)
                }
                else if(data.isRandom === true){
                    setIsRandom(true)
                    random.current.checked = true
                }
        })
    },[])

    // Reset Button Function
    const handleReset = ()=>{
        setUppercaseCount(2)
        setLowercaseCount(2)
        setDigitCount(2)
        setSymbolCount(2)
        setIsRandom(false)
        random.current.checked = false
        data['isRandom'] = false
        storage.set(data)
        handleCount(2, 'uppercaseCount', null)
        handleCount(2, 'lowercaseCount', null)
        handleCount(2, 'digitCount', null)
        handleCount(2, 'symbolCount', null)
        setRandomPass('')
        setPassInputLength(0)
    }

    // Random Checkbox Function
    const handleRandom = ()=>{
        data['isRandom'] = !isRandom
        storage.set(data)
        setIsRandom(!isRandom)

    }
    return ( 
        <div className="main">
            <nav>
                <Link to='/history'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/></svg>
                </Link>
            </nav>
            <main>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <fieldset>
                            <legend>
                                <div className="pattern" pattern = 'Pattern: A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> 
                                </div>
                                Uppercase letters 
                                <div>Count: <span className="length">{uppercaseCount}</span></div>
                            </legend>
                            <input ref={upperCaseRef} onChange={(e)=>handleCount(e.target.value, 'uppercaseCount', setUppercaseCount)} value={uppercaseCount} type="range" max='100'/>
                        </fieldset>
                        <fieldset>
                            <legend>
                                <div className="pattern" pattern = 'Pattern: a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> 
                                </div>
                                Lowercase letters <div>Count: <span className="length">{lowercaseCount}</span></div></legend>
                            <input ref={lowerCaseRef} onChange={(e)=>handleCount(e.target.value, 'lowercaseCount', setLowercaseCount)} value={lowercaseCount} type="range" max='100'/>
                        </fieldset>
                        <fieldset>
                            <legend>
                            <div className="pattern" pattern = 'Pattern: 0,1,2,3,4,5,6,7,8,9'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> 
                            </div>
                            Digits <div>Count: <span className="length">{digitCount}</span></div></legend>
                            <input ref={digitsRef} onChange={(e)=>handleCount(e.target.value, 'digitCount', setDigitCount)} value={digitCount} type="range" max='100'/>
                        </fieldset>
                        <fieldset>
                            <legend>
                                <div className="pattern" pattern="Pattern: \!#$%&'()*+,-./:;<=>?[]^_`|{}~">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> 
                                </div>
                                Symbols  <div>Count: <span className="length">{symbolCount}</span></div></legend>
                            <input ref={symbolsRef} name="symbolCount" onChange={(e)=>handleCount(e.target.value, 'symbolCount',  setSymbolCount)} value={symbolCount} type="range" max='100'/>
                        </fieldset>
                        <div className="charlength">Character length: <span className="length">{passLength}</span></div>
                        <span className="invalid">
                            {validator.message("Character length", Number(passLength), "required|min:6,num")}
                        </span>
                        <div className="checkboxes">
                            <label><input ref={random} onClick={handleRandom} type="checkbox" name="length"/>  Random</label>
                            <button onClick={handleReset} type="reset">Reset</button>
                        </div>
                    </div>
                    <div className="result">
                        <label htmlFor="result">Password <div>Length: <span className="length">{passInputLength}</span></div></label>
                        <div className="password">
                            <input ref={inputpass} value={randomPass} onChange={(e)=>{return(setRandomPass(e.target.value), setPassInputLength(e.target.value.length))}}  type="input" max='100'/>
                            <svg onClick={()=>{return (navigator.clipboard.writeText(inputpass.current.value), setRandomPass(''),setPassInputLength(0))}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        </div>
                    </div>
                    <button>Generate</button>
                </form>

            </main>
        </div>
    );
}

export default Main;