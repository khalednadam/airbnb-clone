'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterInputProps {
    value: number,
    title: string,
    subtitle: string,
    onChange: (value: number) => void;
}


const CounterInput: React.FC<CounterInputProps> = ({ onChange, subtitle, title, value }) => {
    const onAdd = useCallback(() => onChange(value + 1) , [onChange, value]);
    const onReduce = useCallback(() => {
        if(value === 1){
            return;
        }
        onChange(value - 1)
    } , [onChange, value]);
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-neutral-400">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
                <div className="w-10 h-10 rounded-full border-[1px] flex border-neutral-600 justify-center items-center hover:cursor-pointer" onClick={onReduce}>
                    <AiOutlineMinus />
                </div>
                <div className="font-xl text-neutral-600">
                    {value}
                </div>
                <div className="w-10 h-10 rounded-full border-[1px] flex border-neutral-600 justify-center items-center hover:cursor-pointer" onClick={onAdd}>
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
}
 
export default CounterInput;