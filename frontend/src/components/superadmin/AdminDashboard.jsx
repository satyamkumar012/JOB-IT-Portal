import React, { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setStats } from '@/redux/adminSlice';
import { Users, Briefcase, FileText, TrendingUp, UserCheck, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
    const { stats } = useSelector(store => store.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setStats(res.data.stats));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchStats();
    }, [dispatch]);

    return (
        <div className='flex min-h-screen bg-slate-50 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/30'>
            <AdminSidebar />
            <main className='flex-1 p-8 overflow-y-auto no-scrollbar'>
                <div className='max-w-7xl mx-auto'>
                    <div className='mb-10 flex justify-between items-end'>
                        <div>
                            <h1 className='text-4xl font-extrabold text-slate-900 tracking-tight'>System Overview</h1>
                            <p className='text-slate-500 mt-2 text-lg'>Welcome back! Here's what's happening on your platform today.</p>
                        </div>
                        <div className='hidden md:block'>
                             <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-sm font-medium text-slate-600'>
                                <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
                                System Live & Healthy
                             </div>
                        </div>
                    </div>
 
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {/* Users Card */}
                        <Link to="/admin/users" className='group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer'>
                            <div className='bg-indigo-50 p-4 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-inner'>
                                <Users size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-1'>Total Users</p>
                                <h3 className='text-3xl font-black text-slate-900 leading-none'>{stats?.totalUsers || 0}</h3>
                            </div>
                        </Link>
 
                        {/* Jobs Card */}
                        <Link to="/admin/jobs/manage" className='group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer'>
                            <div className='bg-emerald-50 p-4 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner'>
                                <Briefcase size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-1'>Active Jobs</p>
                                <h3 className='text-3xl font-black text-slate-900 leading-none'>{stats?.totalJobs || 0}</h3>
                            </div>
                        </Link>
 
                        {/* Applications Card */}
                        <div className='group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1'>
                            <div className='bg-amber-50 p-4 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-inner'>
                                <FileText size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-1'>Applications</p>
                                <h3 className='text-3xl font-black text-slate-900 leading-none'>{stats?.totalApplications || 0}</h3>
                            </div>
                        </div>
 
                        {/* Growth Card */}
                        <div className='group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1'>
                            <div className='bg-primary/10 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner'>
                                <TrendingUp size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-1'>Platform Info</p>
                                <h3 className='text-xl font-black text-slate-900 leading-none truncate'>Stability OK</h3>
                            </div>
                        </div>
                    </div>
 
                    <div className='mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 pb-10'>
                        <div className='lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl'></div>
                            <div className='relative z-10'>
                                <h2 className='text-2xl font-black text-slate-900 mb-8 flex items-center gap-3'>
                                    <div className='w-1.5 h-8 bg-indigo-600 rounded-full'></div>
                                    User Distribution
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='flex flex-col gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-3'>
                                                <div className='bg-primary/20 p-2 rounded-lg text-primary'>
                                                    <Users size={20} />
                                                </div>
                                                <span className='font-bold text-slate-700'>Student Base</span>
                                            </div>
                                            <span className='text-xs font-black text-slate-400 uppercase tracking-widest'>Platform Users</span>
                                        </div>
                                        <div className='flex items-end justify-between'>
                                            <span className='text-4xl font-black text-slate-900'>{stats?.totalStudents || 0}</span>
                                            <div className='h-2 bg-slate-200 flex-1 mx-4 mb-2 rounded-full overflow-hidden'>
                                                <div className='h-full bg-primary rounded-full' style={{width:'100%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-3'>
                                                <div className='bg-indigo-100 p-2 rounded-lg text-indigo-600'>
                                                    <UserCheck size={20} />
                                                </div>
                                                <span className='font-bold text-slate-700'>Recruiters</span>
                                            </div>
                                            <span className='text-xs font-black text-slate-400 uppercase tracking-widest'>Employers</span>
                                        </div>
                                        <div className='flex items-end justify-between'>
                                            <span className='text-4xl font-black text-slate-900'>{stats?.totalRecruiters || 0}</span>
                                            <div className='h-2 bg-slate-200 flex-1 mx-4 mb-2 rounded-full overflow-hidden'>
                                                <div className='h-full bg-indigo-600 rounded-full' style={{width:'100%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
 
                        <div className='lg:col-span-2 bg-indigo-600 p-8 rounded-3xl shadow-xl border-none flex flex-col justify-center items-center text-center relative overflow-hidden text-white'>
                             <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]'></div>
                             <div className='relative z-10 w-full'>
                                <div className='bg-white/20 backdrop-blur-md p-6 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/30'>
                                    <UserPlus size={48} className='text-white' />
                                </div>
                                <h3 className='text-3xl font-black mb-3'>Platform Admin</h3>
                                <p className='text-indigo-100 mb-8 max-w-xs mx-auto text-lg leading-relaxed'>
                                    Maintain the integrity of the ecosystem by managing accounts and listings.
                                </p>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Link to="/admin/users" className='bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors'>Users</Link>
                                    <Link to="/admin/jobs/manage" className='bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-400 transition-colors border border-indigo-400'>Jobs</Link>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
