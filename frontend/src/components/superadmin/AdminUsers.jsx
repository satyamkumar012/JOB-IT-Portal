import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllUsers, removeUser } from '@/redux/adminSlice';
import { Trash2, User, Search, UserMinus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AdminUsers = () => {
    const { allUsers } = useSelector(store => store.admin);
    const [filterText, setFilterText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllUsers(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    const deleteUserHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/user/${id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(removeUser(id));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message || "Failed to delete user");
        }
    };

    const filteredUsers = allUsers.filter(user => 
        user.fullname.toLowerCase().includes(filterText.toLowerCase()) || 
        user.email.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className='flex min-h-screen bg-slate-50'>
            <AdminSidebar />
            <main className='flex-1 p-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='mb-8 flex justify-between items-center'>
                        <div>
                            <h1 className='text-3xl font-bold text-slate-900'>Manage Users</h1>
                            <p className='text-slate-500'>View, filter, and delete user accounts from the platform.</p>
                        </div>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
                            <Input 
                                type="text"
                                placeholder="Search by name or email..."
                                className='pl-10 w-80'
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
                        <table className='w-full text-left'>
                            <thead className='bg-slate-50 border-b border-slate-200'>
                                <tr>
                                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider'>User</th>
                                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider'>Role</th>
                                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider'>Contact</th>
                                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider'>Joined Date</th>
                                    <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-200'>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className='hover:bg-slate-50 transition-colors'>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden'>
                                                        {user.profile?.profilePhoto ? (
                                                            <img src={user.profile.profilePhoto} alt="" className='w-full h-full object-cover' />
                                                        ) : (
                                                            <User size={20} className='text-slate-500' />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className='font-bold text-slate-900'>{user.fullname}</p>
                                                        <p className='text-xs text-slate-500'>{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'recruiter' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 text-slate-600'>
                                                {user.phoneNumber}
                                            </td>
                                            <td className='px-6 py-4 text-slate-600'>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className='px-6 py-4 text-right'>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    onClick={() => deleteUserHandler(user._id)}
                                                    className='text-red-500 hover:text-red-700 hover:bg-red-50'
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className='px-6 py-10 text-center text-slate-500 font-medium'>
                                            <div className='flex flex-col items-center gap-2'>
                                                <UserMinus size={40} className='text-slate-300' />
                                                <p>No users found matching your search.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminUsers;
