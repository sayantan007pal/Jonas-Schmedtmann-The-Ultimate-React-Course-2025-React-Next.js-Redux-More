import { useState } from "react"
export default function App() {
    const [advice,setAdvice] = useState("Fetching Advice...")
let getAdvice = async() =>{
    try {
        let adviceFetched = await fetch("https://api.adviceslip.com/advice")
        let data = await adviceFetched.json()
        setAdvice(data.slip.advice)
        // console.log(data.slip.advice)
        
    } catch (err) {
        console.error(err.message)
    }
}

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
    </div>
  );
}