import React from 'react'
import ReactDOM from 'react-dom/client'
import  './index.css'

//BY default we're in strict mode in React 18 and above, which means that React will run the App component twice in development mode to help us find any potential issues with our code. This is a new feature in React 18 and above, and it's not a bug.
//thus we will see the console log twice because of the strict mode, but in production mode it will only run once and it will not cause any issues with our application. So we can safely ignore the double console log in development mode.
function App(){
  return <div>
    <Headers />
    <Menu/>
    <Footers/>
  </div>
}
function Headers(){
  // const headStyle = {color: 'red', fontSize: '48px', textTransform:'uppercase'};
  
    // return <h1 style={headStyle}>Fast React Co.</h1>
    return (
      <header className="header">
        <h1 >Fast React Co.</h1>
      </header>
  )
}

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Menu(){
  return (
    <div className='menu'>
    <h2>Our Menu</h2>
    <Pizza/>
    </div>
  )
}

function Footers(){
  const hour = new Date().getHours();
  const openHour =12;
  const closeHour =22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if(isOpen) alert("We're curently open!")
  //   else alert("Sorry we're closed")

    return <footer className='footer'>
    <div>
      <h3>
        {new Date().toLocaleTimeString()}. We're currently open
      </h3>

    </div>
  </footer>
}


//never nest this component inside the App component because it will cause an infinite loop and crash the application, we will define it outside of the App component and then we will use it inside the App component
function Pizza(props){
  console.log(props)


  return (<div>

    <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, and all delicious.</p>
    
    <ul className='pizzas'>
      {pizzaData.map((pizza) => (
        <li key={pizza.name} className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
          <img src={pizza.photoName} alt={pizza.name} />
          <div>
            <h3>{pizza.name}</h3>
            <p>{pizza.ingredients}</p>
            <span>{pizza.soldOut ? 'SOLD OUT' : `$${pizza.price}`}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}
//then we will render App component to the DOM by using ReactDOM.createRoot and root.render which is the new way to render in React 18 and above

const root  = ReactDOM.createRoot(document.getElementById('root')); // this will create a root for our React application and it will be attached to the DOM element with the id 'root'
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>); // this will render the App component inside the root we just created
