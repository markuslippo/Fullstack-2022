import { useDispatch, useSelector } from "react-redux"

import { setFilter } from '../reducers/filterReducer'
import { getFilter } from "../reducers/filterReducer"

const Filter = () => {
    const style = {
        marginBottom: 10
    }

    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }


    return (
    <div style={style}>
    filter <input value={filter} onChange={handleChange}/>
    </div>
    )
}

export default Filter