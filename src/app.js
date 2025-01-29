// src/App.js
import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AdminDashboard from './admindashboard';
import SignIn from './signin';

function App() {
  const [user, setUser] = useState(null);

  // Listen to authentication state changes
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <div className="App">
      {user ? <AdminDashboard /> : <SignIn onSignIn={() => {}} />}
    </div>
  );
}

export default App;
