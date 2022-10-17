const Notification = ({ message, color }) => {

    
    if (message === undefined) {
      return null
    }
  
    return (
      <div className={`notification ${color}`}>
        {message}
      </div>
    )
  }

export default Notification