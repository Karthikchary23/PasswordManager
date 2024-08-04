import React from 'react';

function Navbar() {
  return (
    <>
      <nav className='bg-slate-800 text-white '>
        <div className=" md:container flex justify-around p-3 mx-auto ">
          <div className="logo font-bold text-xl">
            
            <span className='text-green-400'>&lt;</span>
            <span className='font-bold'>Pass</span>
            <span className='text-green-400'>Manager/ &gt;</span>
          </div>
          <ul className=' md:flex gap-4 text-md '>
            <li>
              <a className='hover:font-bold' href="/">Home</a>
            </li>
            <li>
              <a className='hover:font-bold'href="">About</a>
            </li>
            <li>
              <a className='hover:font-bold'href="">Contact</a>
            </li>
            <li>
              <a className='hover:font-bold'href="">Blog</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
