import { useState } from "react"
export default function App() {
    const [advice,setAdvice] = useState("Fetching Advice...")
    const [val, updatedVal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
let getAdvice = async() =>{

    try {
          setIsLoading(true)
        let adviceFetched = await fetch("https://api.adviceslip.com/advice")
        let data = await adviceFetched.json()
        setAdvice(data.slip.advice)
        updatedVal(prev => prev + 1)

        // console.log(data.slip.advice)
        
    } catch (err) {
        console.error(err.message)
    }finally{
        setIsLoading(false)
    }
}

  return (
    <div>
      <h1>{advice}</h1>
      <button disabled={isLoading} onClick={getAdvice}>
        {isLoading ? "Loading..." : "Get Advice"}
      </button>
      <p>you have read <strong>{val}</strong> pieces of advice</p>
    </div>
  );
}