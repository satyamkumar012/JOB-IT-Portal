import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAuthUser, setLoading } from "@/redux/authSlice"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

export function UpdateProfileDialog({ open, setOpen }) {
    const { authUser, loading } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: authUser?.fullname,
        email: authUser?.email,
        phoneNumber: authUser?.phoneNumber,
        bio: authUser?.profile?.bio,
        skills: authUser?.profile?.skills?.join(",") || "",
        file: authUser?.profile?.resume,
        profilePhoto: null,
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
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
        if (!input.bio) {
            newErrors.bio = "Bio is required.";
        }
        if (!input.skills) {
            newErrors.skills = "Skills are required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const profilePhotoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, profilePhoto: file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }
        if (input.profilePhoto) {
            formData.append('profilePhoto', input.profilePhoto);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px] border-none" onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeHandler}
                                />
                                {errors.fullname && <span className='text-xs text-red-600'>{errors.fullname}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeHandler}
                                />
                                {errors.email && <span className='text-xs text-red-600'>{errors.email}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="number"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeHandler}
                                />
                                {errors.phoneNumber && <span className='text-xs text-red-600'>{errors.phoneNumber}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="bio"
                                    value={input.bio}
                                    name="bio"
                                    onChange={changeHandler}
                                />
                                {errors.bio && <span className='text-xs text-red-600'>{errors.bio}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">
                                Skills
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="skills"
                                    value={input.skills}
                                    name="skills"
                                    onChange={changeHandler}
                                />
                                {errors.skills && <span className='text-xs text-red-600'>{errors.skills}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="profilePhoto" className="text-right">
                                Profile Image
                            </Label>
                            <Input
                                id="profilePhoto"
                                type="file"
                                name="profilePhoto"
                                accept="image/*"
                                onChange={profilePhotoChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Resume
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                name="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        {
                            loading ? (
                                <Button>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Update</Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
