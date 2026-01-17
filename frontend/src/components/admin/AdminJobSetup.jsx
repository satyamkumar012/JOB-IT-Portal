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
    }
    const handleSelectChange = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({
            ...input,
            companyId: selectedCompany._id
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
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
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description"
                                value={
                                    input.description
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements"
                                value={
                                    input.requirements
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
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
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location"
                                value={
                                    input.location
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType"
                                value={
                                    input.jobType
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
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
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input type='number' name="position"
                                value={
                                    input.position
                                }
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"/>
                        </div>
                        {
                        companies.length !== 0 && (
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
