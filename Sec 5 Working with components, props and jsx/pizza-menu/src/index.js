import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//BY default we're in strict mode in React 18 and above, which means that React will run the App component twice in development mode to help us find any potential issues with our code. This is a new feature in React 18 and above, and it's not a bug.
//thus we will see the console log twice because of the strict mode, but in production mode it will only run once and it will not cause any issues with our application. So we can safely ignore the double console log in development mode.
function App() {
  return (
    <div>
      <Headers />
      {/* <Profile 
  img = "pizzas/focaccia.jpg"
  name="John Doe" 
  description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  skill1="React" 
  skill2="Node.js" 
  skill3="TypeScript"/> */}
      <Menu />

      <Footers />
    </div>
  );
}

function Profile(props) {
  return (
    <div className="card">
      <img src={props.img} alt={props.name} />
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <span style={{ backgroundColor: 'red', fontSize: '10px' }}>
        {props.skill1}
      </span>
      <span style={{ backgroundColor: 'blue', fontSize: '10px' }}>
        {props.skill2}
      </span>
      <span style={{ backgroundColor: 'pink', fontSize: '10px' }}>
        {props.skill3}
      </span>
    </div>
  );
}
function Headers() {
  // const headStyle = {color: 'red', fontSize: '48px', textTransform:'uppercase'};

  // return <h1 style={headStyle}>Fast React Co.</h1>
  return (
    <header className="header">
      <h1>Fast React Co.</h1>
    </header>
  );
}

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function Menu() {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <Pizza pizzaData={pizzaData} />
    </div>
  );
}

function Footers() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if(isOpen) alert("We're curently open!")
  //   else alert("Sorry we're closed")

  return (
    <footer className="footer">
      <div>
        {/* here we are using conditional rendering to show different content based on the value of isOpen. this is called short-circuit evaluation, which is a common pattern in React for conditional rendering. if isOpen is true, it will render the first part of the expression, and if it's false, it will render the second part of the expression. this is a concise way to conditionally render content in React." */}
        {!isOpen && (
          <div className="order">
            <p>
              Sorry we're closed. We're happy to welcome you between {openHour}
              :00 and {closeHour}:00.
            </p>
            <button className="btn">Order Now</button>
          </div>
        )}
        {isOpen && (
          <div className="order">
            <p>We're curently open! Come visit us or order online.</p>
            <button className="btn">Order Now</button>
          </div>
        )}
      </div>
    </footer>
  );
}

//never nest this component inside the App component because it will cause an infinite loop and crash the application, we will define it outside of the App component and then we will use it inside the App component
function Pizza(props) {
  console.log(props);
  const { pizzaData } = props; // destructure pizzaData from props

  return (
    <div>
      <h3 className="menu">
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, and all delicious.
      </h3>

      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <PizzaItem key={pizza.name} pizzaObj={pizza} />
        ))}
      </ul>
    </div>
  );
}

// Single pizza component - here we can use the early return pattern!
// if the pizza is sold out, return null and don't render anything for that pizza
function PizzaItem({ pizzaObj }) {
  // EARLY RETURN PATTERN: if soldOut is true, return null and skip rendering this pizza entirely
  if (pizzaObj.soldOut === true) return null;

  // If we reach here, the pizza is NOT sold out, so we render it
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>${pizzaObj.price}</span>
      </div>
    </li>
  );
}
//then we will render App component to the DOM by using ReactDOM.createRoot and root.render which is the new way to render in React 18 and above

const root = ReactDOM.createRoot(document.getElementById('root')); // this will create a root for our React application and it will be attached to the DOM element with the id 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // this will render the App component inside the root we just created
