import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Briefcase, LogOut, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const RecruiterSidebar = () => {
    return (
        <div className='w-64 bg-white min-h-screen text-slate-600 p-6 flex flex-col border-r border-slate-200 sticky top-0 h-screen'>
            {/* Brand Section */}
            <div className='mb-10 flex items-center gap-3 px-2'>
                <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl'>
                    J
                </div>
                <div className='flex flex-col'>
                    <span className='text-slate-900 font-bold text-lg leading-none'>JobIT</span>
                    <span className='text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5'>Recruiter Hub</span>
                </div>
            </div>
            
            {/* Navigation */}
            <nav className='flex-1 flex flex-col gap-1'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4'>Management</p>
                
                {[
                    { to: "/admin/companies", icon: Building2, label: "Companies" },
                    { to: "/admin/jobs", icon: Briefcase, label: "Job Postings" }
                ].map((item, idx) => (
                    <NavLink 
                        key={idx}
                        to={item.to} 
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <item.icon size={18} />
                        <span className='text-sm font-semibold'>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer Section */}
            <div className='mt-auto pt-6 border-t border-slate-100'>
                <NavLink 
                    to="/" 
                    className='flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all'
                >
                    <LogOut size={18} />
                    <span className='text-sm font-semibold'>Exit Dashboard</span>
                </NavLink>
            </div>
        </div>
    );
};

export default RecruiterSidebar;
