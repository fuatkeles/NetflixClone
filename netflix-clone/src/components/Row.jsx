import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'

import Movie from './Movie';



const Row = ({title, fetchURL, rowID}) => {
  const [movies, setMovies] = useState([])
  

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
        setMovies(response.data.results)
    })
  }, [fetchURL])
  
  const slideLeft =() =>{
    var slider = document.getElementById('slider' + rowID)
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  const slideRight =() =>{
    var slider = document.getElementById('slider' + rowID)
    slider.scrollLeft = slider.scrollLeft + 500;
  }
  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} onClick={slideLeft}/>
      <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
        {movies.map((item, id) => (
          <Movie key={id} item={item}/>
        ))}
      </div>
      <MdChevronRight className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' onClick={slideRight} size={40}/>
      </div>
    </>
  );
}

export default Row