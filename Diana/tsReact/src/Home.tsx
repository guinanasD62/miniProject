import React from 'react';
import './styles.css';
import Navigation from './Navigation';
import { useState, useEffect } from 'react';
import LoanApplications from './Pages/LoanApplications';

const HomePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Fetch the name from local storage on component mount
    const storedName = localStorage.getItem('currentName');
    if (storedName) {
      setCurrentUser(storedName);
    }
  }, []);

  return (
    <div>
      <header className='navbar'>
        <h1>Loan management</h1>
        <Navigation />
      </header>
      <main>
        <section>
          <h2>Welcome {currentUser}</h2>
        </section>

        <div>
         <LoanApplications/>
        </div>
      </main>
      <footer>
       
      </footer>
    </div>
  );
}

export default HomePage;
