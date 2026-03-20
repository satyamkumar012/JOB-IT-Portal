import React, {useEffect, useState} from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from './shared/Footer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import Jobnotfound from './Jobnotfound'

const Jobs = () => {
    const {authUser} = useSelector((store) => store.auth);
    const {allJobs, searchText, filters} = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs || []);
    const navigate = useNavigate();

    useEffect(() => {
        let filteredJobs = allJobs || [];

        // Apply global search text (from Hero section)
        if (searchText) {
            filteredJobs = filteredJobs.filter((job) => {
                const isTitleMatch = job?.title?.toLowerCase().includes(searchText.toLowerCase());
                const isDescMatch = job?.description?.toLowerCase().includes(searchText.toLowerCase());
                const isLocationMatch = job?.location?.toLowerCase()?.includes(searchText.toLowerCase());
                return isTitleMatch || isDescMatch || isLocationMatch;
            });
        }

        // Apply specific category filters from sidebar (AND logic)
        if (filters?.location) {
            filteredJobs = filteredJobs.filter(job => 
                job?.location?.toLowerCase()?.includes(filters.location.toLowerCase())
            );
        }
        if (filters?.industry) {
            filteredJobs = filteredJobs.filter(job => 
                job?.title?.toLowerCase()?.includes(filters.industry.toLowerCase())
            );
        }
        if (filters?.salary) {
            filteredJobs = filteredJobs.filter(job => 
                job?.salary?.toString()?.includes(filters.salary)
            );
        }

        setFilterJobs(filteredJobs);
    }, [allJobs, searchText, filters]);


    useEffect(() => {
        if (authUser ?. role === 'recruiter') {
            navigate("/admin/jobs");
        }
    })
    return (
        <div className='min-h-screen'>
            <Navbar/>
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard/>
                    </div>
                    {
                    filterJobs ?. length <= 0 ? <Jobnotfound/>: (
                        <div className='flex-1 h-[88vh] overflow-y-auto  no-scrollbar pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                filterJobs && filterJobs ?. map((job) => (
                                    <motion.div key={
                                            job._id
                                        }
                                        initial={
                                            {
                                                opacity: 0,
                                                x: 100
                                            }
                                        }
                                        animate={
                                            {
                                                opacity: 1,
                                                x: 0
                                            }
                                        }
                                        exit={
                                            {
                                                opacity: 0,
                                                x: -100
                                            }
                                        }
                                        transition={
                                            {duration: 0.3}
                                    }>
                                        <Job job={job}/>
                                    </motion.div>
                                ))
                            } </div>
                        </div>
                    )
                } </div>
            </div>
        </div>

    )
}

export default Jobs
