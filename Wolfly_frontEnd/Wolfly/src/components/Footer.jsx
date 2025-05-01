import React from 'react'
import card from '../Images/cards.png'
import { NavLink } from 'react-router-dom'
import facebook_logo from '../Images/facebook_logo.png'
import instagram_logo from '../Images/instagram_logo.png'
import linked_logo from '../Images/linked_logo.png'
import github_logo from '../Images/github_logo.png'
import youtube_logo from '../Images/youtube_logo.png'
import logo from '../Images/logo.png';
const Footer = () => {
    return (
        <>
            <footer className='bg-dark-teal text-teal-100'>
                <div className='mt-44 pt-10 pb-5 px-5'>
                    <div className='flex flex-col '>
                    <span className=" font-mono p-2 w-50 ">
                        <span className="flex items-center">
                         <img src={logo} alt="Wolfly Logo" className="w-40 h-20 mr-2" />
                        </span>
                    </span>
                        <p className='my-5 font-thin'>
                            Welcome to Wolfly, your ultimate destination for cutting-edge gadgets!
                        </p>
                        <img src={card} alt={card} className='w-48 my-5' />
                    </div>
                    <div className='flex gap-x-96 gap-y-4 flex-wrap  font-thin'>
                        <div className='flex flex-col '>
                            <h4 className='mb-5 font-medium'>JOIN US</h4>
                            <div className='flex'>
                                <NavLink to="https://www.facebook.com/" target='_blank' className='mb-5'><img src={facebook_logo} alt={facebook_logo} className='w-7' /></NavLink>
                                <NavLink to="https://www.instagram.com/" target='_blank' className='mb-5'><img src={instagram_logo} alt={instagram_logo} className='w-7' /></NavLink>
                                <NavLink to="https://in.linkedin.com/" target='_blank' className='mb-5'><img src={linked_logo} alt={linked_logo} className='w-7' /></NavLink>
                                <NavLink to="https://github.com/" target='_blank' className='mb-5'><img src={github_logo} alt={github_logo} className='w-7' /></NavLink>
                                <NavLink to="https://www.youtube.com/" target='_blank' className='mb-5'><img src={youtube_logo} alt={youtube_logo} className='w-7' /></NavLink>
                            </div>
                        </div>


                    </div>


                </div>

                <div className='border-t-2 border-gray-500'>
                    <div className='py-2 text-center text-xl font-thin text-gray-500'>
                        <p>© 2025 Wolfly, All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;