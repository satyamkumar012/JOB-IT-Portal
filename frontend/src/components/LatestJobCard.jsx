import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCard = ({job}) => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all'>
            <div>
                <h1 className='font-medium text-lg text-white'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-300'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-400'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-300 font-bold'} variant={'ghost'}>{job?.position} Positions</Badge>
                <Badge className={'text-indigo-400 font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-purple-300 font-bold'} variant={'ghost'}>{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard