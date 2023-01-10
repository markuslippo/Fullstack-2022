import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            const text = action.payload
            return text
        }
    }
})

export const { setFilter } = filter.actions
export default filter.reducer