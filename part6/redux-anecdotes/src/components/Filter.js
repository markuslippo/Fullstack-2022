import { setFilter } from '../reducers/filterReducer'
import { connect } from "react-redux"

const Filter = (props) => {
    const style = {
        marginBottom: 10
    }

    const applyFilter = (event) => {
        props.setFilter(event.target.value)
    }

    return (
    <div style={style}>
    filter <input value={props.filter} onChange={applyFilter}/>
    </div>
    )
}

const mapStateToProps = (state) => {
    return { filter: state.filter }
}

const mapDispatchToProps = {
    setFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)