import React from 'react'

const Footer = () => {
  return (
      <footer className="bg-white rounded-tl-lg rounded-tr-lg shadow  dark:bg-gray-800 p-3">
          <span  className='text-3xl shadow-lg font-bold m-5 mt-7 text-slate-400'><b className='text-green-400 font-bold '><i className=' text-black rounded-lg pr-2  bg-green-500'>P</i></b>erago</span>
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between  -mt-4 mb-3">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://melak.tk/" className="hover:underline hover:text-green-400">Melak.tk</a> &nbsp;&nbsp;All Rights Reserved.
                </span>
                <ul className="flex justify-center flex-wrap items-center  mt-3 text-lg font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#About" className="mr-4 hover:underline  md:mr-6 ">About us</a>
                    </li>
                    <li>
                        <a href="#privacy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#Licensing" className="mr-4 hover:underline md:mr-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#Contact" className="hover:underline">Contact</a>
                    </li>
              </ul>
               <ul className="flex justify-end flex-wrap items-center  mt-3 text-lg font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                         <i className="fab fa-youtube hover:text-green-500 pr-3 text-slate-400 mb-5 inline"></i>
                    </li>
                    <li>
                         <i className="fab fa-facebook hover:text-green-500 pr-3 text-slate-400 mb-5 inline"></i>
                    </li>
                    <li>
                         <i className="fab fa-linkedin hover:text-green-500 pr-3 text-slate-400 mb-5 inline"></i>
                    </li>
              </ul>
          </div>
          <div className="mt-10 font-sans flex justify-center text-slate-500"><i className="fa fa-map-marker-alt text-slate-400 mt-1 "></i>&nbsp;&nbsp;&nbsp;2015 ETH , Addis Ababa , Hayahulet</div>
          

      </footer>
  )
}

export default Footer