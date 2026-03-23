
import './App.css';


const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
  function handlePrevious(){
    alert('Previous');
  }
  const step = 2;
  return (
    <div className="App">
          <div className='numbers'>
            <div className= {`${step >= 1 ? 'active' : ''}`}>1</div>
            <div className= {`${step >= 2 ? 'active' : ''}`}>2</div>
            <div className= {`${step === 3 ? 'active' : ''}`}>3</div>
         </div>
         <div className='message'>
            <p>Step: {step} {messages[step - 1]}</p>
         </div>
         <div className='buttons'>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handlePrevious} className='button active'> 
              {/* here in onClick={handlePrevious} we are passing the function reference as callback, as if we use onClick={handlePrevious()} without the arrow function, it would execute immediately without waiting for the click event */}
              <span>Previous</span>
            </button>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={()=> alert('Next')} className='button active'>
              {/* here in onClick={()=> alert('Next')} we are using an arrow function to define the callback inline, which allows us to execute the alert function when the button is clicked without needing to define a separate function like handleNext. */}
              <span>Next</span>
            </button>
         </div>
        

    </div>
  );
}

export default App;
