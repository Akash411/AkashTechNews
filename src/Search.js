import React from 'react'
import { useGlobalContext } from './Context';


const Search = () => {
  
const {query, changeQuery} = useGlobalContext();


  return (
    <form onSubmit={(e) => e.preventDefault()}>
    <div className='search-input'>
    <input 
      type="text"
      placeholder="Search here" 
      value={query} 
      onChange={(e)=>changeQuery(e.target.value)} />
    </div>
    </form>
  )
}

export default Search;