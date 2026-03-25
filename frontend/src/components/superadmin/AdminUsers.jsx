import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllUsers, removeUser } from '@/redux/adminSlice';
import { Trash2, User, Search, UserMinus, Mail, Phone, FileText, ExternalLink, History, BadgeCheck, Eye } from 'lucide-react';
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
        <div className='flex min-h-screen bg-slate-50 bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/30'>
            <AdminSidebar />
            <main className='flex-1 p-8 overflow-y-auto no-scrollbar'>
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
                                className='pl-10 w-80 rounded-full border-slate-200'
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
                        <table className='w-full text-left'>
                            <thead className='bg-slate-50 border-b border-slate-200'>
                                <tr>
                                    <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>User Information</th>
                                    <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Role</th>
                                    <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>Join Date</th>
                                    <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100'>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className='hover:bg-slate-50/50 transition-colors group'>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden shrink-0'>
                                                        {user.profile?.profilePhoto ? (
                                                            <img src={user.profile.profilePhoto} alt="" className='w-full h-full object-cover' />
                                                        ) : (
                                                            <User size={24} className='text-indigo-400' />
                                                        )}
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span className='font-bold text-slate-900 leading-tight'>{user.fullname}</span>
                                                        <span className='text-sm text-slate-500'>{user.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Badge className={`rounded-full px-3 py-0.5 border-none ${user.role === 'recruiter' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-2 text-slate-500 text-sm'>
                                                    <History size={14} />
                                                    {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 text-right'>
                                                <div className='flex justify-end items-center gap-2'>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button 
                                                                variant="outline" 
                                                                size="icon"
                                                                className='h-9 w-9 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-lg transition-all'
                                                            >
                                                                <Eye size={18} />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                                                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white relative">
                                                                <div className="flex items-center gap-6 relative z-10">
                                                                    <div className='w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-xl'>
                                                                        {user.profile?.profilePhoto ? (
                                                                            <img src={user.profile.profilePhoto} alt="" className='w-full h-full object-cover' />
                                                                        ) : (
                                                                            <User size={48} className='text-white/40' />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge className="bg-indigo-500 hover:bg-indigo-600 border-none">{user.role}</Badge>
                                                                            <span className="text-white/50 text-xs flex items-center gap-1">
                                                                                <History size={12} /> Joined {new Date(user.createdAt).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                        <h2 className="text-3xl font-bold tracking-tight">{user.fullname}</h2>
                                                                        <p className="text-white/60 text-sm flex items-center gap-2">
                                                                            <Mail size={14} /> {user.email}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                                                    <BadgeCheck size={120} />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <div className="space-y-6">
                                                                    <section>
                                                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Contact Information</h4>
                                                                        <div className="space-y-3">
                                                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group/item">
                                                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                                                                                    <Phone size={14} />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Phone Number</div>
                                                                                    <div className="text-sm font-bold text-slate-900">{user.phoneNumber || "Not provided"}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group/item">
                                                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                                                                                    <Mail size={14} />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</div>
                                                                                    <div className="text-sm font-bold text-slate-900">{user.email}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>

                                                                    <section>
                                                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Professional Bio</h4>
                                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed italic">
                                                                            {user.profile?.bio || "This user hasn't added a bio yet."}
                                                                        </div>
                                                                    </section>
                                                                </div>

                                                                <div className="space-y-6">
                                                                    <section>
                                                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Skills & Expertise</h4>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {user.profile?.skills && user.profile.skills.length > 0 ? (
                                                                                user.profile.skills.map((skill, i) => (
                                                                                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                                                                                        {skill}
                                                                                    </span>
                                                                                ))
                                                                            ) : (
                                                                                <span className="text-slate-400 text-sm italic">No skills listed.</span>
                                                                            )}
                                                                        </div>
                                                                    </section>

                                                                    <section>
                                                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Resume / Portfolio</h4>
                                                                        {user.profile?.resume ? (
                                                                            <a 
                                                                                href={user.profile.resume} 
                                                                                target="_blank" 
                                                                                rel="noopener noreferrer"
                                                                                className="flex items-center justify-between p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 transition-colors group/resume"
                                                                            >
                                                                                <div className="flex items-center gap-3">
                                                                                    <FileText size={20} className="text-indigo-500" />
                                                                                    <div className="flex flex-col">
                                                                                        <span className="text-xs font-bold uppercase truncate max-w-[150px]">{user.profile.resumeOriginalName || "Resume.pdf"}</span>
                                                                                        <span className="text-[10px] opacity-60">Click to view document</span>
                                                                                    </div>
                                                                                </div>
                                                                                <ExternalLink size={16} className="opacity-0 group-hover/resume:opacity-100 transition-opacity" />
                                                                            </a>
                                                                        ) : (
                                                                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 border-dashed text-center text-slate-400 text-xs">
                                                                                No resume uploaded.
                                                                            </div>
                                                                        )}
                                                                    </section>

                                                                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                                                                        <span className="text-[10px] text-slate-300 font-mono">USER_ID: {user._id}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        onClick={() => deleteUserHandler(user._id)}
                                                        className='h-9 w-9 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all'
                                                    >
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className='px-6 py-20 text-center text-slate-500 font-medium'>
                                            <div className='flex flex-col items-center gap-2'>
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                                                    <UserMinus size={32} className='text-slate-300' />
                                                </div>
                                                <p className='text-lg text-slate-600'>No users found</p>
                                                <p className='text-sm text-slate-400'>Try adjusting your search filters.</p>
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
