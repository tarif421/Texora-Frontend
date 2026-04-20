import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GiRolledCloth } from 'react-icons/gi';
import { IoCallSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return <>
        <section className='flex justify-between  p-8 bg-[#1A1A1A] mt-12 px-12'>
            {/* left */}
            <div >
                <div className='flex'>
                    <span className="text-4xl text-[#ffffff]">
                          <GiRolledCloth/>
                        </span>
                        <p className=" font-serif text-3xl font-bold text-[#ffffff]">Texora</p>
                </div>
                <p className='text-start text-[#c6cbec] mt-4'>Empowering garment factories  with <br /> digital  tools for  better management, <br />transparency,  and efficiency</p>
            </div>


            {/* center */}
            <div className='text-[#c6cbec]'>
                <h2 className='text-[#ffffff] font-bold text-xl'>Quick Links</h2>
                <div className='flex flex-col text-start mt-4'>
                    <a href="">All Products</a>
                <a href="">Home</a>
                <a href="">Login</a>
                <a href="">Register</a>
                </div>
            </div>
            {/* right */}
            <div>
             
               
            <h2 className="text-[#ffffff] text-2xl font-semibold ">Contact</h2>
           <div className="flex gap-2 mt-4 ">
            <span className="text-[#ffffff]"><FaLocationDot /></span>
            <p className='text-[#c6cbec]'>Dhaka, Bangladesh</p>
           </div>
           <div  className="flex gap-2 ">
            <span className="text-[#ffffff]" ><MdEmail /></span>
            <p className='text-[#c6cbec]' >fabro@gmail.com</p>
           </div>
           <div className="flex gap-2 ">
            <span className="text-[#ffffff]"><IoCallSharp /></span>
            <p className='text-[#c6cbec]'>+880123837940</p>
           </div>
        
            </div>

        </section>
        
            <div className='bg-[#1A1A1A] text-[#c6cbec]  p-4'>
                <p>© 2023 Fabrio. All rights reserved</p>
            </div>
    </>;
};

export default Footer;