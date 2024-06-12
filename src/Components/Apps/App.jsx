import React, { useState, useEffect } from 'react'
import PersonService from '../../Service/Person'
import Number from '../Number/Number'
import Phonebook from '../Phonebook/Phonebook'
import Notification from '../Notification/Notification'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    {
     name: "Arto Hellas",
     number: "08078698593"
    }
  ])


  const [newName, setNewName] = useState('')
  const [newUser, setNewUser] = useState('')
  const [notification, setNotification] = useState({message: null, type: ''});

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewUser(event.target.value)

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUser = persons.find(person => person.name === newName);
    if (existingUser) {
      if (window.confirm(`${existingUser.name} is already in the phonebook, replace the old number with the new one?`)){
        const updatedUser = {...existingUser, number: newUser};
        PersonService
        .update(existingUser.id, updatedUser)
        .then (returnPerson => {
          setPersons(persons.map(person => person.id !== existingUser.id ? person : returnPerson));
          setNewName('');
          setNewUser('');
          showNotification(`Updated ${existingUser.name}'s number`);
        })
        .catch (error => {
          console.error('Error updating person:', error)
        });
      }
    } else {
      const newPerson = {name: newName, number: newUser};
    PersonService
    .create(newPerson)
    .then(returnPerson => {
    setPersons([...persons, returnPerson]);
    setNewName('');
    setNewUser('');
    showNotification(`Added ${returnPerson.name}`, 'success');
    })
    .catch(error => {
      console.error('Error adding person', error);
    });
    }
  };

  const showNotification = (message, type) => {
    setNotification({message, type});
    setTimeout(() => {
      setNotification({message: null, type: ""});
    }, 5000);
  };

  
  useEffect(() => {
    PersonService
    .getAll()
    .then(initialPerson => {
      setPersons(initialPerson);
    })
    .catch(error => {
      console.error('Error Fetching initial data:', error)
    });
  }, []);
  

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        showNotification(`Deleted ${person.name}`, 'error');
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
    }
  };

  return (
   <div>
    <h2>Phonebook</h2>
    <Notification message={notification.message} type={notification.type} />
    <Phonebook               
                             newName={newName}
                             newUser={newUser} 
                             handleChange={handleChange} 
                             handleNumberChange={handleNumberChange}
                             handleSubmit={handleSubmit}
                             />

    <Number persons={persons} handleDelete={handleDelete} />
    
    
   </div>
      
  )

}


export default App
