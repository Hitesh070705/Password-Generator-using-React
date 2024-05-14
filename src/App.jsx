import { useState,useEffect, useCallback,useRef } from 'react'
import './App.css'

function App() {
  const [password,setPassword]=useState("")
  const [length, setLength] = useState(4)
  const [numberallowed,setNumberallowed]=useState(false)
  const [specialchallowed,setSpecialchallowed]=useState(false)
   
  const inputref=useRef(null) 

  const passwordgenerator=useCallback(()=>{
    let pass="";
    let set="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    if(numberallowed){
      set+="0123456789"
    }
    if(specialchallowed){
      set+="!@#$&()_";
    }

    for(let i=0;i<length;i++){
      let index=Math.floor(Math.random()*set.length)+1;
      pass+=set.charAt(index);
    }
    setPassword(pass)
  },[length,numberallowed,specialchallowed])


  useEffect(()=>{
    passwordgenerator()
  },[length,numberallowed,specialchallowed,passwordgenerator])


  const copy=()=>{
    window.navigator.clipboard.writeText(password);
    inputref.current.select();
    // alert("Password Copied");


  }
  return (
    <>
   
    <div className="container ">
      <div className="box">
      <h2 className='text-white text-center mt-3'>Password Generator</h2>
      <div className='d-flex justify-content-center mt-3'>
        <input type="text" name='pwd' id='pwd' style={{width:"420px",outline:"none"}} ref={inputref} value={password} readOnly/>
        <button className='btn btn-primary' onClick={copy} >Copy</button>
      </div>
      <div className='d-flex mt-3 justify-content-around'>
        <div>
        <input type="range" name="len" id="len" min={4} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
        <label htmlFor="len">Length {length}</label>
        </div>

        <div>
        <input type="checkbox" name="spe" id="spe" onChange={()=>{setSpecialchallowed((prev)=>{return (!prev) })}}/>
        <label htmlFor="spe">Special-Characters</label>
        </div>

        <div>
        <input type="checkbox" name="num" id="num" onChange={()=>{setNumberallowed(prev=>!prev)}}/>
        <label htmlFor="num">Numbers</label>
        </div>
      </div>
      </div>
    </div>
    
    </>
  )
}

export default App
