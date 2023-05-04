import React from 'react'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Movie = ({item}) => {
    const [like, setLike] = useState(false)
    const {user} = UserAuth()
    const [saved, setSaved] = useState(false)

    const movieID = doc(db,'users', `${user?.email}`)

    const saveShow = async () => {
      if (user?.email) {
        setLike(!like);
        setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      } else {
        alert('Please log in to save a movie');
      }
    };

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 '>
              <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 '>
                  <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center text-white'>
                    {item?.title}
                  </p>
                  <div onClick={saveShow}>
                    <FontAwesomeIcon icon={like ? fasHeart : farHeart} className='absolute top-4 left-4 text-gray-300' onClick={() => setLike(!like)} />
                  </div>
              </div>
         </div>
  )
}

export default Movie