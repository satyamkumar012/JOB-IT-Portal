import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/jobs");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <div className='text-center mx-auto'>
                    <div className="text-white px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-medium shadow-sm">No. 1 Job IT Portal Website</div>
                </div>
                <div>
                    <h1 className='text-5xl font-bold text-white tracking-tight'>Search, Apply &
                        <br />
                        Get Your
                        <span className='text-rose-300'> Dream Jobs</span>
                    </h1>
                </div>
                <div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Connect, Apply, and Land your dream job with our comprehensive job portal. Thousands of opportunities waiting for you.
                    </p>
                </div>
                <div className='flex w-[40%] shadow-lg border pl-3 border-white/20 bg-white/10 backdrop-blur-md rounded-full items-center gap-4 mx-auto'>
                    <input type="text" name="query"
                        value={query}
                        onChange={
                            (e) => setQuery(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Find your dream jobs"
                        className="outline-none border-none w-full bg-transparent text-white placeholder:text-gray-300" />
                    <Button onClick={searchJobHandler}
                        className='rounded-r-full bg-primary hover:bg-primary/90 text-white'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
