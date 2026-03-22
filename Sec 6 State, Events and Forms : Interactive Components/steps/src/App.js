
import './App.css';


const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
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
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} className='button active'>
              <span>Previous</span>
            </button>
            <button style={{backgroundColor: "#7950f2", color: "#fff"}} className='button active'>
              <span>Next</span>
            </button>
         </div>
        

    </div>
  );
}

export default App;
