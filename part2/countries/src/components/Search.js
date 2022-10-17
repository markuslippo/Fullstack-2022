const Search = ({search, onChange}) => {
    return (
    <form >
        <div>find countries <input value={search} onChange={onChange}/></div>
    </form>
    )
}
export default Search