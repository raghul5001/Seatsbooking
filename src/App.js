import React, { useState } from 'react';
import Login from './Login';
import SeatBooking from './SeatBooking';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    // Perform login logic, e.g., authenticate user
    // Once authenticated, set the logged-in user
    setLoggedInUser(username);
    // Redirect to the seat booking page
    // You can implement the redirection logic here using React Router or any other method
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <SeatBooking/>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
