import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      //Get the object and change to use with only important data. Ref: https://firebase.google.com/docs/firestore/query-data/get-data
      setUsers(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getUsers();
  }, []);

  return (
    <>
      <div className="App">
        <input
          placeholder="Nome"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Idade"
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
        <button onClick={createUser}>Create</button>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h1>Nome: {user.name}</h1>
              <h1>Idade: {user.age}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default App;
