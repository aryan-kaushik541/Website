import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SyncIcon from '@mui/icons-material/Sync';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useState } from 'react';

const Policy = () => {
    const [data, setData] = useState([
        {
            icon: LocalShippingIcon,
            first_para: "Worldwide Shipping",
            second_para: "Order Above $100",
        },
        {
            icon: SyncIcon,
            first_para: "Easy 30 Day Returns",
            second_para: "Back Returns In 7 Days",
        },
        {
            icon: MonetizationOnIcon,
            first_para: "Money Back Guarantee",
            second_para: "Guarantee With In 30-Days",
        },
        {
            icon: HeadphonesIcon,
            first_para: "Easy Online Support",
            second_para: "24/7 Any Time Support",
        }
    ])
    return (
        <>
            <section className='my-5 mx-7 shadow-md min-w-56'>
                <div className='flex justify-between flex-wrap md:flex-row flex-col'>
                    {
                        data.map((element, index) => {
                            return (
                                <div className="px-10 py-12 flex items-center gap-4 text-xl"  key={index} >
                                    <div className='text-dark-teal font-bold'>
                                        <element.icon  />
                                    </div>

                                    <div>
                                        <p>
                                            {element.first_para}
                                        </p>
                                        <p>
                                            {element.second_para}
                                        </p>
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

export default Policy;
