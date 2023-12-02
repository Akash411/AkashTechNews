import React from 'react'
import { useGlobalContext } from './Context';

const Pagination = () => {

  var count = 0;
  const {prevPage, nextPage,page,nbPages} = useGlobalContext();

  return (
    <div className='pagination'>
    <button onClick={prevPage}>Left</button>
    <p>{page+1} of {nbPages}</p>
      <button onClick={nextPage}>Right</button>
    </div>
  )
}

export default Pagination;