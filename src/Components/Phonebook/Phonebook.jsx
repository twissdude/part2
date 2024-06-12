import React from 'react'

const Phonebook = (props)=> {

  
  return (
    <div>
     <form onSubmit={props.handleSubmit}>
      <div>
        name: <input
                name='name'
                value={props.newName}
                onChange={props.handleChange}
              />
              <br />
              <br />

        number: <input
                name='name'
                value={props.newUser}
                onChange={props.handleNumberChange}
              />
      </div>
      <br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}

export default Phonebook