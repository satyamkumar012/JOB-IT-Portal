import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs, removeJob } from '@/redux/adminSlice';
import { Trash2, Briefcase, Search, MapPin, Building2, Calendar, Info, Layers, Trophy, Mail, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '../ui/badge';

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
                                className='pl-10 w-96 rounded-full border-slate-200'
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div key={job._id} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow duration-300'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='text-xl font-bold text-slate-900'>{job.title}</h3>
                                            <div className='flex items-center gap-2 text-slate-500 text-sm'>
                                                <Building2 size={16} className="text-indigo-500" />
                                                <span className='font-medium'>{job.company?.name || "N/A"}</span>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => deleteJobHandler(job._id)}
                                            className='text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full'
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
                                            <span className='font-bold text-slate-900'>₹{job.salary} LPA</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm'>
                                            <span className='text-slate-500'>Applicants:</span>
                                            <span className='font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded'>{job.applications?.length || 0}</span>
                                        </div>
                                    </div>

                                    <div className='pt-4 border-t border-slate-100 flex justify-between items-center'>
                                        <div className='flex flex-col'>
                                            <div className='text-[10px] uppercase tracking-wider text-slate-400 font-bold'>Posted By</div>
                                            <div className='text-xs text-slate-600 font-medium'>{job.created_by?.fullname || "Unknown"}</div>
                                        </div>
                                        
                                        <div className='flex items-center gap-2'>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="text-indigo-600 border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 h-8 gap-1 rounded-lg"
                                                    >
                                                        Details <ChevronRight size={14} />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl rounded-2xl">
                                                    <div className="bg-slate-900 p-8 text-white">
                                                        <DialogHeader>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Badge className="bg-indigo-500 hover:bg-indigo-600 border-none px-3 py-1">{job.jobType}</Badge>
                                                                <Badge variant="outline" className="text-slate-400 border-slate-700">{job.location}</Badge>
                                                            </div>
                                                            <DialogTitle className="text-3xl font-bold leading-tight">{job.title}</DialogTitle>
                                                            <div className="flex items-center gap-2 mt-4 text-slate-300">
                                                                <Building2 size={18} className="text-indigo-400" />
                                                                <span className="text-lg font-medium">{job.company?.name}</span>
                                                            </div>
                                                            <DialogDescription className="text-slate-400 mt-2">
                                                                Full job details and recruiter information for the {job.title} position.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                    </div>
                                                    
                                                    <div className="p-8 bg-white">
                                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1 uppercase tracking-wider font-bold">
                                                                    <Trophy size={14} className="text-amber-500" /> Experience
                                                                </div>
                                                                <div className="text-slate-900 font-bold">{job.experienceLevel}</div>
                                                            </div>
                                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1 uppercase tracking-wider font-bold">
                                                                    <Layers size={14} className="text-indigo-500" /> Positions
                                                                </div>
                                                                <div className="text-slate-900 font-bold">{job.position} Vacancies</div>
                                                            </div>
                                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1 uppercase tracking-wider font-bold">
                                                                    <Info size={14} className="text-emerald-500" /> Salary
                                                                </div>
                                                                <div className="text-slate-900 font-bold">₹{job.salary} LPA</div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <section>
                                                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div> Description
                                                                </h4>
                                                                <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">{job.description}</p>
                                                            </section>

                                                            <section>
                                                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                    <div className="w-1 h-4 bg-indigo-500 rounded-full"></div> Requirements
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {job.requirements && job.requirements.length > 0 ? (
                                                                        job.requirements.map((req, index) => (
                                                                            <span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-100">
                                                                                {req}
                                                                            </span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="text-slate-400 italic text-sm">No specific requirements listed.</span>
                                                                    )}
                                                                </div>
                                                            </section>

                                                            <section className="pt-6 border-t border-slate-100">
                                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Posted By Recruiter</h4>
                                                                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl uppercase">
                                                                        {job.created_by?.fullname?.charAt(0) || "U"}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-slate-900 font-bold">{job.created_by?.fullname || "Unknown User"}</div>
                                                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                                            <Mail size={14} />
                                                                            <span>{job.created_by?.email || "N/A"}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ml-auto text-[10px] text-slate-400 font-medium">
                                                                        ID: {job._id}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
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
