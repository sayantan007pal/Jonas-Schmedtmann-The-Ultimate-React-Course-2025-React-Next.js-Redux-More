import { use, useState } from 'react';
import './App.css';


const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
  const handlePrevious = () => {
    if(step === 1) return;
    setStep(step - 1);
  }
  const handleNext = () => {
    if(step === 3) return;
    setStep(step + 1);

  //Bad Practice: We should never mutate the state directly, as it can lead to unexpected behavior and bugs in our application. Instead, we should always use the setState function provided by React to update the state, which ensures that the component re-renders correctly and maintains the integrity of the state.
    // test.name = 'John';
  };
  const [step, setStep] = useState(1);
  // const [test] = useState({name: 'Sayantan'});
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <button className='close' onClick={() => setIsOpen(!isOpen)}>X</button>
    {isOpen && (<div className="App">
          <div className='numbers'>
            <div className= {step >= 1 ? 'active' : ''}>1</div>
            <div className= {step >= 2 ? 'active' : ''}>2</div>
            <div className= {step === 3 ? 'active' : ''}>3</div>
         </div>
         <div className='message'>
            <p>Step: {step} {messages[step - 1]}</p>
            {/* <p>Name: {test.name}</p> */}

         </div>
         {/* <div className='buttons'>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handlePrevious} className='button active'> 
              {/* here in onClick={handlePrevious} we are passing the function reference as callback, as if we use onClick={handlePrevious()} without the arrow function, it would execute immediately without waiting for the click event */}
              {/* <span>Previous</span>
            </button>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={()=> alert('Next')} className='button active'>
              {/* here in onClick={()=> alert('Next')} we are using an arrow function to define the callback inline, which allows us to execute the alert function when the button is clicked without needing to define a separate function like handleNext. */}
              {/* <span>Next</span>
            </button>
         </div>
         */} 

                <div className='buttons'>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handlePrevious} className='button active'> 
              {/* here in onClick={handlePrevious} we are passing the function reference as callback, as if we use onClick={handlePrevious()} without the arrow function, it would execute immediately without waiting for the click event */}
              <span>Previous</span>
            </button>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handleNext} className='button active'>
              {/* here in onClick={handleNext} we are passing the function reference as callback, as if we use onClick={handleNext()} without the arrow function, it would execute immediately without waiting for the click event */}
              <span>Next</span>
            </button>
         </div>
    </div>)}
  </div>
  );
}

export default App;
