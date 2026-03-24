import React, {useEffect, useState} from 'react'
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import Navbar from '../shared/Navbar'
import {Button} from '../ui/button'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {setLoading} from '@/redux/authSlice'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import {toast} from 'sonner'
import {useNavigate, useParams} from 'react-router-dom'

const AdminJobSetup = () => {
    const params = useParams();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [errors, setErrors] = useState({});
    const {companies} = useSelector(store => store.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${
                    import.meta.env.VITE_API_BASE_URL
                }/job/${
                    params.id
                }`, {withCredentials: true});
                if (res.data.success) {
                    const job = res.data.job;
                    setInput({
                        title: job.title,
                        description: job.description,
                        requirements: job.requirements ?. join(",") || "",
                        salary: job.salary,
                        location: job.location,
                        jobType: job.jobType,
                        experience: job.experienceLevel,
                        position: job.position,
                        companyId: job.company
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch job details");
            }
        };
        fetchJob();
    }, [params.id]);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!input.title || input.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters.";
        }
        if (!input.description || input.description.length < 10) {
            newErrors.description = "Description must be at least 10 characters.";
        }
        if (!input.requirements) {
            newErrors.requirements = "Requirements are required.";
        }
        if (!input.salary) {
            newErrors.salary = "Salary is required.";
        } else if (isNaN(input.salary) || Number(input.salary) <= 0) {
            newErrors.salary = "Salary must be a positive number.";
        }
        if (!input.location) {
            newErrors.location = "Location is required.";
        }
        if (!input.jobType) {
            newErrors.jobType = "Job Type is required.";
        }
        if (!input.experience) {
            newErrors.experience = "Experience is required.";
        }
        if (input.position <= 0) {
            newErrors.position = "Number of positions must be at least 1.";
        }
        if (!input.companyId) {
            newErrors.companyId = "Please select a company.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSelectChange = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({
            ...input,
            companyId: selectedCompany._id
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            dispatch(setLoading(true));
            const res = await axios.put(`${
                import.meta.env.VITE_API_BASE_URL
            }/job/update/${
                params.id
            }`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const selectedCompanyName = companies.find(c => c._id === input.companyId) ?. name.toLowerCase();

    return (
        <div>
            <Navbar/>
            <div className='flex items-center justify-center w-screen my-5'>
                <div className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title"
                                value={
                                    input.title
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.title && <span className='text-xs text-red-600'>{errors.title}</span>}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description"
                                value={
                                    input.description
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.description && <span className='text-xs text-red-600'>{errors.description}</span>}
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements"
                                value={
                                    input.requirements
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.requirements && <span className='text-xs text-red-600'>{errors.requirements}</span>}
                        </div>
                        <div>
                            <Label>Salary
                                <span className='text-xs text-gray-500'>(in LPA)</span>
                            </Label>
                            <Input type="text" name="salary"
                                value={
                                    input.salary
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.salary && <span className='text-xs text-red-600'>{errors.salary}</span>}
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location"
                                value={
                                    input.location
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.location && <span className='text-xs text-red-600'>{errors.location}</span>}
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType"
                                value={
                                    input.jobType
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.jobType && <span className='text-xs text-red-600'>{errors.jobType}</span>}
                        </div>
                        <div>
                            <Label>Experience Level
                                <span className='text-xs text-gray-500'>(in years)</span>
                            </Label>
                            <Input type="text" name="experience"
                                value={
                                    input.experience
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.experience && <span className='text-xs text-red-600'>{errors.experience}</span>}
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input type='number' name="position"
                                value={
                                    input.position
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                            {errors.position && <span className='text-xs text-red-600'>{errors.position}</span>}
                        </div>
                        {
                        companies.length !== 0 && (
                            <div className='flex flex-col gap-1'>
                                <Select value={selectedCompanyName}
                                    onValueChange={handleSelectChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup> {
                                            companies && companies.map((company) => {
                                                return (
                                                    <SelectItem key={
                                                            company ?. _id
                                                        }
                                                        value={
                                                            company ?. name.toLowerCase()
                                                    }>
                                                        {
                                                        company ?. name
                                                    } </SelectItem>
                                                )
                                            })
                                        } </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.companyId && <span className='text-xs text-red-600'>{errors.companyId}</span>}
                            </div>
                        )
                    } </div>
                    <Button onClick={submitHandler}
                        disabled={
                            companies ?. length === 0
                        }
                        className='w-full mt-4'>Update Job</Button>
                    {
                    companies.length === 0 && <p className='text-red-600 text-xs font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                } </div>
            </div>
        </div>
    )
}

export default AdminJobSetup
