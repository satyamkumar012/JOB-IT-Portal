import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {MoreHorizontal} from "lucide-react";
import {useSelector} from "react-redux"
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";

import {motion} from "framer-motion";
import axios from "axios";
import {toast} from "sonner";
import { setApplicantsStatus } from "@/redux/applicationSlice";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ViewResumeDialog from "../ViewResumeDialog";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const {applicants} = useSelector(store => store.application);
    const dispatch = useDispatch();
    const [resumeOpen, setResumeOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState({ url: "", title: "" });


    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${
                import.meta.env.VITE_API_BASE_URL
            }/application/status/${id}/update`, {
                status
            }, {withCredentials: true});
            if (res.data.success) {
                dispatch(setApplicantsStatus({ id, status: status.toLowerCase() }));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <Table>
            <TableCaption>A list of your recent applied user</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody> {
                applicants && applicants ?. applications ?. map((item) => (
                    <motion.tr initial={
                            {x: -100}
                        }
                        animate={
                            {x: 0}
                        }
                        exit={
                            {x: -100}
                        }
                        transition={
                            {duration: 0.5}
                        }
                        key={
                            item ?. _id
                    }>
                        <TableCell>{
                            item ?. applicant ?. fullname
                        }</TableCell>
                        <TableCell>{
                            item ?. applicant ?. email
                        }</TableCell>
                        <TableCell>{
                            item ?. applicant ?. phoneNumber
                        }</TableCell>
                        <TableCell className="text-blue-600 cursor-pointer">
                            {
                            item ?. applicant ?. profile ?. resume ? <span onClick={() => {
                                setSelectedResume({
                                    url: item?.applicant?.profile?.resume,
                                    title: item?.applicant?.profile?.fullname || "Resume"
                                });
                                setResumeOpen(true);
                            }}
                                className="hover:underline">
                                {
                                item ?. applicant ?. profile ?. resumeOriginalName || "View Resume"
                            }</span> : <span>NA</span>
                        } </TableCell>
                        <TableCell>{
                            item ?. createdAt ?. split("T")[0]
                        }</TableCell>
                        <TableCell>
                            <Badge className={`${item?.status === 'rejected' ? 'bg-red-400' : item?.status === 'accepted' ? 'bg-green-400' : 'bg-gray-400'}`}>{item?.status?.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell className="float-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {
                                    shortlistingStatus.map((sts, idx) => {
                                        return (
                                            <div key={idx}
                                                onClick={
                                                    () => statusHandler(sts, item ?. _id)
                                                }
                                                className="flex w-fit items-center gap-2 my-2 cursor-pointer">
                                                <span>{sts}</span>
                                            </div>
                                        )
                                    })
                                } </PopoverContent>
                            </Popover>
                        </TableCell>
                    </motion.tr>
                ))
            } </TableBody>
            <ViewResumeDialog 
                open={resumeOpen} 
                setOpen={setResumeOpen} 
                url={selectedResume.url} 
                title={selectedResume.title}
            />
        </Table>
    )
}
export default ApplicantsTable;
