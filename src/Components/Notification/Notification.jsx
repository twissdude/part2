import React from 'react'

 const Notification = ({message, type})=> {

    if (message === null) {
        return null;
    }

    const styles = {
      notification: {
          color: type === 'error' ? 'red' : 'green',
          backgroundColor: 'lightgrey',
          fontSize:'20px',
          borderStyle: 'solid',
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '10px'
    }
    };


  return (
    <div style={styles.notification}>
      {message}
    </div>
  );
};



export default Notification