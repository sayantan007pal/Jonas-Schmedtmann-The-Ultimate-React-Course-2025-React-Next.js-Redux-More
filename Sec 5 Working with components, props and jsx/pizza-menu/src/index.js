import React from 'react'
import ReactDOM from 'react-dom/client'


function App(){
  return <div>
    <Headers />
    <h1>Hello React</h1>
    <Menu/>
    <Footers/>
  </div>
}
function Headers(){
    return <h1>Fast React Co.</h1>
}

function Menu(){
  return (
    <div>
      <h1>
        <Pizza/>
      </h1>
    </div>
  )
}

function Footers(){
    return <footer>{new Date().toLocaleTimeString()}. We're currently open</footer>
}
//never nest this component inside the App component because it will cause an infinite loop and crash the application, we will define it outside of the App component and then we will use it inside the App component
function Pizza(){
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


  return (<div>
    <h2>Our Menu</h2>
    <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, and all delicious.</p>
    
    {/* <ul className='pizzas'>
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
    </ul> */}
  </div>
  )
}
//then we will render App component to the DOM by using ReactDOM.createRoot and root.render which is the new way to render in React 18 and above

const root  = ReactDOM.createRoot(document.getElementById('root')); // this will create a root for our React application and it will be attached to the DOM element with the id 'root'
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>); // this will render the App component inside the root we just created
