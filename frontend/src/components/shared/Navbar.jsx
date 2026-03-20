import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ProfilePopover } from '../ProfilePopover';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { authUser } = useSelector(store => store.auth);
    return (
        <div className='bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold text-white tracking-tight'>Job <span className='text-primary'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            authUser && authUser.role === "recruiter" ? (
                                <>
                                    <li className='hover:text-primary transition-colors cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li className='hover:text-primary transition-colors cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-primary transition-colors cursor-pointer'><Link to={"/"}>Home</Link></li>
                                    <li className='hover:text-primary transition-colors cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                                    <li className='hover:text-primary transition-colors cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !authUser ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant={'outline'} className="text-white border-white/20 hover:bg-white/10">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-primary hover:bg-primary/90 text-white">Signup</Button></Link>
                            </div>
                        ) : (
                            <ProfilePopover />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar