import { createContext, useContext, useEffect, useState } from "react";
import {auth,db} from '../firebase'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore"

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user, setUser] = useState({})

    function signUp(email,password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email),{
          savedShows:[]
        })
      }

    const logIn = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
          setDoc(doc(db, 'users', email),{
            savedShows:[]
          })
        } catch (error) {
          throw new Error(error.message); // hata nesnesi döndürmek için "throw" kullanılır
        }
      };
      
    function logOut (){
        return signOut(auth)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
        setUser(currentUser);
      });
      return () => {
        unsubscribe();
      }
     
    })
    

    return(
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}