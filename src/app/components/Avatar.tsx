"use client";

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar:React.FC<AvatarProps> = ({
    src
}) => {
    return (
        <Image 
        height="30" width="30"
        className="rounded-full"
        alt="avatar"
        src={ src || "/images/placeholder.jpg"}
        />
    );
}
 
export default Avatar;