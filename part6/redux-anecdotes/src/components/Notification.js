import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNotification } from "../reducers/notificationReducer"
import { setNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(!notification) 
    return null
  else 
    return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification