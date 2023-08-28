"use client";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disbaled?: boolean;
    outlined?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label, onClick, disbaled, icon: Icon, outlined, small
}) => {
    return (
    <button onClick={onClick} disabled={disbaled} className={`
    relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
    ${ outlined ? 'bg-white border-black border text-black' : 'bg-rose-500 border-rose-500 text-white' }
    ${ small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-[2px]' }
    `}>
        {
            Icon && (
                <Icon size={24} className="absolute left-4 top-3" />
            )
        }
        {label}
    </button>
    );
}
 
export default Button;