import React from 'react';
import SignupForm from './components/SignupForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Vibrant<span>Shop</span></h1>
        <p>Premium E-commerce Experience</p>
      </header>
      
      <main className="content-area">
        <SignupForm />
      </main>

      <footer className="simple-footer">
        © 2026 VibrantShop. Built with React & Passion.
      </footer>
    </div>
  );
}

export default App;
