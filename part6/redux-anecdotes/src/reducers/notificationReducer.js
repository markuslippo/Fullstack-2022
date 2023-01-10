import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notificationText = action.payload
            return notificationText
        }
    }
})

let timeout = null

export const makeNotification = (notification, time) => {
    return async (dispatch) => {
        dispatch(setNotification(notification))
        timeout 
        ? clearTimeout(timeout)
        :
        setTimeout(() => dispatch(setNotification(null)), time * 1000)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer