import React from 'react'

const Number = ({persons, handleDelete})=> {
  return (
    <div>
      <h2>Numbers</h2>
    <div>
      <ul>
        {
          persons.map((person,index) => (
            <li key={index}>
            {person.name} : {person.number}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
    </div>
  )
}

export default Number
