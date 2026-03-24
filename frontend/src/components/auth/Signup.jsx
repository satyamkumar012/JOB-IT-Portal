import {useEffect, useState} from 'react'
import Navbar from '../shared/Navbar'
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import {Button} from '../ui/button'
import {RadioGroup} from '../ui/radio-group'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'sonner'
import {useDispatch, useSelector} from 'react-redux'
import {setLoading} from '@/redux/authSlice'
import {Loader2} from 'lucide-react'

const Singup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [errors, setErrors] = useState({});
    const {loading, authUser} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };
    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?. [0]
        });
    }

    const validate = () => {
        const newErrors = {};
        if (!input.fullname || input.fullname.length < 3) {
            newErrors.fullname = "Full name must be at least 3 characters.";
        } else if (!/^[a-zA-Z\s]+$/.test(input.fullname)) {
            newErrors.fullname = "Full name must only contain characters.";
        }
        if (!input.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(input.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!input.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\d{10}$/.test(input.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
        }
        if (!input.password) {
            newErrors.password = "Password is required.";
        } else if (input.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (!input.role) {
            newErrors.role = "Please select a role.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${
                import.meta.env.VITE_API_BASE_URL
            }/user/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (authUser ?. role === 'recruiter') {
            navigate("/admin/companies");
        } else if (authUser ?. role === 'student') {
            navigate("/");
        }
    }, [])
    return (
        <>
            <Navbar/>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler}
                    className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-4'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text"
                            value={
                                input.fullname
                            }
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Gupta"/>
                        {errors.fullname && <span className='text-xs text-red-600'>{errors.fullname}</span>}
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email"
                            value={
                                input.email
                            }
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="gupta@gmail.com"/>
                        {errors.email && <span className='text-xs text-red-600'>{errors.email}</span>}
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text"
                            value={
                                input.phoneNumber
                            }
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+918080808080"/>
                        {errors.phoneNumber && <span className='text-xs text-red-600'>{errors.phoneNumber}</span>}
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password"
                            value={
                                input.password
                            }
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"/>
                        {errors.password && <span className='text-xs text-red-600'>{errors.password}</span>}
                    </div>
                    <div className='flex flex-col gap-4 my-5'>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student"
                                    checked={
                                        input.role === 'student'
                                    }
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"/>
                                <Label htmlFor="r1">Students</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter"
                                    checked={
                                        input.role === 'recruiter'
                                    }
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"/>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        {errors.role && <span className='text-xs text-red-600'>{errors.role}</span>}
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"/>
                        </div>
                    </div>
                    {
                    loading ? (
                        <Button className='w-full my-4'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className='w-full my-4'>Sign Up</Button>
                    )
                }
                    <span className='text-sm'>Already have an account?
                        <Link to={"/login"}
                            className='text-blue-500 cursor-pointer underline'>Login</Link>
                    </span>
                </form>
            </div>
        </>
    )
}

export default Singup
