import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs, removeJob } from '@/redux/adminSlice';
import { Trash2, Briefcase, Search, MapPin, Building2, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AdminJobs = () => {
    const { allJobs } = useSelector(store => store.admin);
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/jobs`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs();
    }, [dispatch]);

    const deleteJobHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job? This will also remove all applications for this job.")) return;
        
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/job/${id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(removeJob(id));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message || "Failed to delete job");
        }
    };

    const filteredJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(filterText.toLowerCase()) || 
        job.company?.name.toLowerCase().includes(filterText.toLowerCase()) ||
        job.location.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className='flex min-h-screen bg-slate-50'>
            <AdminSidebar />
            <main className='flex-1 p-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='mb-8 flex justify-between items-center'>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-900'>Manage Jobs</h1>
                            <p className='text-slate-500'>Monitor all job postings and remove fake or spam listings.</p>
                        </div>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
                            <Input 
                                type="text"
                                placeholder="Search by job title, company or location..."
                                className='pl-10 w-96'
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div key={job._id} className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='text-xl font-bold text-slate-900'>{job.title}</h3>
                                            <div className='flex items-center gap-2 text-slate-500 text-sm'>
                                                <Building2 size={16} />
                                                <span className='font-medium'>{job.company?.name || "N/A"}</span>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => deleteJobHandler(job._id)}
                                            className='text-red-500 hover:text-red-700 hover:bg-red-50'
                                        >
                                            <Trash2 size={20} />
                                        </Button>
                                    </div>

                                    <div className='grid grid-cols-2 gap-y-3 mb-6 flex-1'>
                                        <div className='flex items-center gap-2 text-slate-600 text-sm'>
                                            <MapPin size={16} className='text-slate-400' />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-slate-600 text-sm'>
                                            <Calendar size={16} className='text-slate-400' />
                                            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm'>
                                            <span className='text-slate-500'>Salary:</span>
                                            <span className='font-semibold text-slate-900'>₹{job.salary} LPA</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm'>
                                            <span className='text-slate-500'>Applicants:</span>
                                            <span className='font-semibold text-slate-900'>{job.applications?.length || 0}</span>
                                        </div>
                                    </div>

                                    <div className='pt-4 border-t border-slate-100 flex justify-between items-center'>
                                        <div className='text-xs text-slate-400'>
                                            Posted by: <span className='text-slate-600 font-medium'>{job.created_by?.fullname || "Unknown"}</span>
                                        </div>
                                        <div className='px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600 uppercase'>
                                            {job.jobType}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-slate-300'>
                                <div className='flex flex-col items-center gap-2 text-slate-400'>
                                    <Briefcase size={60} strokeWidth={1} />
                                    <p className='text-lg font-medium'>No jobs found matching your search.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminJobs;
