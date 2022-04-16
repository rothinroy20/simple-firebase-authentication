
import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, PhoneAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);


function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }

  return (
    <div className="App">
      <h2>hello world</h2>
      {/* {condition ? true : flase} */}
      {
        user.email ? <button onClick={handleSingOut}>Sing out</button>
          :
          <button onClick={handleGoogleSignIn}>Google Sing In</button>

      }

      <h2>Name: {user.displayName}</h2>
      <p>I know your email address: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
