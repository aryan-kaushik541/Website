import React from 'react'
import { NavLink } from 'react-router-dom'
import Black_Jacket_Front from '../Images/Black_Jacket_Front.png';
import Blue_Tshirt_Front from '../Images/Blue_Tshirt_Front.png';
import Maroon_Front from '../Images/Maroon_Front.png';
import { useState } from 'react'


const Extraproduct = () => {

    const [data, setData] = useState([
        {
            offer: "Get And Extra 50% Off",
            link: "",
            img:Black_Jacket_Front

        },
        {
            offer: "40% Discount On Speakers",
            link: "",
            img:Blue_Tshirt_Front
        },
        {
            offer: "Get And Extra 50% Off",
            link: "",
            
            img:Maroon_Front
        }
    ])

    return (
        <>
            <section className='my-10  mx-7 shadow-lg min-w-56'>
                <div className='flex justify-between flex-wrap    ' >
                    {/* show sale */}

                    {
                        data.map((element, index) => {
                            return (
                                <div className='flex min-w-56 py-5 md:w-fit w-full md:shadow-sm  md:flex-row flex-col-reverse mt-4 md:mx-0 mx-4' key={index}>
                                    <div className='m-10 '>
                                        <p className='bg-dark-teal text-teal-100 inline-block px-5  text-lg '>NEW YEAR SALE</p>
                                        <h3 className='font-bold text-2xl w-40'>{element.offer}</h3>
                                        <NavLink to={element.link} className="text-sm hover:underline" target='_blank'>SHOW NOW</NavLink>
                                    </div>

                                    <div className='flex justify-center'>
                                        <img src={element.img} className='md:w-36  md:h-36  md:mr-10' />
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </section>
        </>
    )
}

export default Extraproduct;