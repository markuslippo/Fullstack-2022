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

let timeoutID = null

export const makeNotification = (notification, time) => {
    return async (dispatch) => {
        clearTimeout(timeoutID)
        dispatch(setNotification(notification))

        timeoutID = setTimeout(() => {
            dispatch(setNotification(''));
        }, time * 1000);
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer