import { useEffect, useState } from 'react';

export function useAuth(authFirebase) {
  const [authentification, setAutentification] = useState(null);

  const auth = authFirebase();
  const provider = new authFirebase.GoogleAuthProvider();

  const logIn = () => auth.signInWithPopup(provider);

  const logOut = () => auth.signOut()
      .catch(err => console.error())

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        setAutentification(user)
      } else {
        setAutentification(null)
      }
    })
  }, [auth, authentification]);

  return { authentification, logIn, logOut };
}