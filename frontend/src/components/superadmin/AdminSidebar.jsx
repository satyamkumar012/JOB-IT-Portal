import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, LogOut } from 'lucide-react';

const AdminSidebar = () => {
    return (
        <div className='w-64 bg-slate-900 min-h-screen text-white p-4 flex flex-col'>
            <div className='mb-10 text-xl font-bold border-b border-slate-700 pb-4 flex items-center gap-2'>
                <span className='text-indigo-400'>JobIT</span> Portal Admin
            </div>
            
            <nav className='flex-1 flex flex-col gap-2'>
                <NavLink 
                    to="/admin/dashboard" 
                    className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>
                
                <NavLink 
                    to="/admin/users" 
                    className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                    <Users size={20} />
                    <span>Manage Users</span>
                </NavLink>
                
                <NavLink 
                    to="/admin/jobs/manage" 
                    className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                    <Briefcase size={20} />
                    <span>Manage Jobs</span>
                </NavLink>
            </nav>

            <div className='mt-auto border-t border-slate-700 pt-4'>
                <NavLink 
                    to="/" 
                    className='flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors'
                >
                    <LogOut size={20} />
                    <span>Exit Admin Panel</span>
                </NavLink>
            </div>
        </div>
    );
};

export default AdminSidebar;
