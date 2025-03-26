import React from 'react'
import pagenotfound from './Images/pagenot.png'
const PageNotFound = () => {
    return (
        <>


            <p className='text-center text-3xl font-semibold'>Page Not Found Wolfly</p>
            <div className='flex  justify-center  m-6 min-w-52 h-96  '>
                <img src={pagenotfound} alt={pagenotfound} />
            </div>
        </>
    )
}

export default PageNotFound
