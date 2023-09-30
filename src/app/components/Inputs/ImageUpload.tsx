"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
	var cloundinary: any;
}

interface ImageUploadProps {
	value: string;
	onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);
	return (
		<div>
			<CldUploadWidget
				onUpload={handleUpload}
				uploadPreset="ws9tmmze"
				options={{
					maxFiles: 1,
				}}
			>
				{({ open }) => {
					return (
						<div
							onClick={() => open?.()}
							className="relative
                            cursor-pointer
                            hover:opacity-70
                            transition
                            border-dashed
                            rounded-lg
                            border-2
                            p-20
                            border-neutral-300
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                            text-neutral-600"
						>
							<TbPhotoPlus size={50} />
							<div className="font-semibold text-lg">
								Upload an image
							</div>
							{value && (
								<div className="absolute inset-0 w-full h-full">
									<Image
										alt="Upload"
										fill
										style={{ objectFit: "cover" }}
										src={value}
									/>
								</div>
							)}
						</div>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
