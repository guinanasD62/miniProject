import React from 'react';
import Navigation from '../Navigation';

const ContactPage: React.FC = () => {
  return (
    <div>
      <header  className='navbar'>
        <h1>Contact Us</h1>
        <Navigation />
      </header>
      <main>

        <section>
          <h2>-</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={4}></textarea>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactPage;
