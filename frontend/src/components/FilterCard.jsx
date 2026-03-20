import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, setSearchText } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        filterType: "Salary",
        array: ["1", "5", "10", "20", "50"]
    },
];

const FilterCard = () => {
    const { filters } = useSelector(store => store.job) || {};
    const dispatch = useDispatch();

    const handleFilterChange = (type, value) => {
        const filterType = type.toLowerCase();
        dispatch(setFilters({ [filterType]: value }));
    };

    const clearAllFilters = () => {
        dispatch(setFilters({ location: "", industry: "", salary: "" }));
        dispatch(setSearchText(""));
    };

    const currentFilters = filters || { location: "", industry: "", salary: "" };

    return (
        <div className='w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg text-white'>Filter Jobs</h1>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-gray-400 hover:text-white"
                >
                    Clear All
                </Button>
            </div>
            <hr className='mt-3 border-white/10' />
            <div className='space-y-4 mt-2'>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-medium text-lg text-white mb-2'>{data.filterType}</h1>
                        <RadioGroup 
                            value={currentFilters[data.filterType.toLowerCase()]} 
                            onValueChange={(value) => handleFilterChange(data.filterType, value)}
                        >
                            {data.array.map((item, idx) => {
                                const itemId = `r${index}-${idx}`;
                                const displayItem = data.filterType === "Salary" ? `${item} LPA` : item;
                                return (
                                    <div key={idx} className="flex items-center space-x-2 my-1 text-white">
                                        <RadioGroupItem value={item} id={itemId} className="border-white/20" />
                                        <Label htmlFor={itemId} className="cursor-pointer text-sm">{displayItem}</Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCard;
