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
        <div className='flex min-h-screen bg-slate-50'>
            <AdminSidebar />
            <main className='flex-1 p-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='mb-8'>
                        <h1 className='text-3xl font-bold text-slate-900'>System Overview</h1>
                        <p className='text-slate-500'>Welcome to the SuperAdmin Dashboard. Monitor your platform's health.</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {/* Users Card */}
                        <Link to="/admin/users" className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 transition-transform hover:scale-105 cursor-pointer'>
                            <div className='bg-indigo-100 p-3 rounded-lg text-indigo-600'>
                                <Users size={28} />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-slate-500'>Total Users</p>
                                <h3 className='text-2xl font-bold text-slate-900'>{stats?.totalUsers || 0}</h3>
                            </div>
                        </Link>

                        {/* Jobs Card */}
                        <Link to="/admin/jobs/manage" className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 transition-transform hover:scale-105 cursor-pointer'>
                            <div className='bg-emerald-100 p-3 rounded-lg text-emerald-600'>
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-slate-500'>Active Jobs</p>
                                <h3 className='text-2xl font-bold text-slate-900'>{stats?.totalJobs || 0}</h3>
                            </div>
                        </Link>

                        {/* Applications Card */}
                        <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 transition-transform hover:scale-105'>
                            <div className='bg-orange-100 p-3 rounded-lg text-orange-600'>
                                <FileText size={28} />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-slate-500'>Total Applications</p>
                                <h3 className='text-2xl font-bold text-slate-900'>{stats?.totalApplications || 0}</h3>
                            </div>
                        </div>

                        {/* Growth Card - Example */}
                        <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 transition-transform hover:scale-105'>
                            <div className='bg-purple-100 p-3 rounded-lg text-purple-600'>
                                <TrendingUp size={28} />
                            </div>
                            <div>
                                <p className='text-sm font-medium text-slate-500'>Quick Stats</p>
                                <h3 className='text-md font-bold text-slate-900'>Platform Healthy</h3>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-200'>
                            <h2 className='text-xl font-bold text-slate-900 mb-6'>User Distribution</h2>
                            <div className='space-y-4'>
                                <div className='flex justify-between items-center bg-slate-50 p-4 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-blue-500 w-2 h-8 rounded-full'></div>
                                        <span className='font-medium'>Students</span>
                                    </div>
                                    <span className='font-bold text-lg'>{stats?.totalStudents || 0}</span>
                                </div>
                                <div className='flex justify-between items-center bg-slate-50 p-4 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-indigo-500 w-2 h-8 rounded-full'></div>
                                        <span className='font-medium'>Recruiters</span>
                                    </div>
                                    <span className='font-bold text-lg'>{stats?.totalRecruiters || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center'>
                             <div className='text-center'>
                                <div className='bg-indigo-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-indigo-600'>
                                    <UserPlus size={40} />
                                </div>
                                <h3 className='text-xl font-bold text-slate-900'>Need Help?</h3>
                                <p className='text-slate-500 mt-2 max-w-xs mx-auto'>
                                    Manage platform users and jobs effectively from the sidebar navigation.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
