"use client";

import Image from "next/image";

const Avatar = () => {
    return (
        <Image 
        height="30" width="30"
        className="rounded-full"
        alt="avatar"
        src="/images/placeholder.jpg"
        />
    );
}
 
export default Avatar;