"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.error) {
				toast.error(callback.error);
			} else if (callback?.ok) {
				toast.success("Logged in 🎉");
				router.refresh();
				loginModal.onClose();
				
			}
		});
	};
	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back!" subtitle="Login to your account" />
			<Input
				id="email"
				type="text"
				label="Email"
				register={register}
				disabled={isLoading}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				register={register}
				disabled={isLoading}
				errors={errors}
				required
				type="password"
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outlined
				label="Continue with google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outlined
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div
				className="
            text-neutral-500
            text-center
            mt-4
            font-light
            "
			>
				<div className="flex items-center gap-2 justify-center">
					<div>Already have an account?</div>
					<div
						onClick={loginModal.onClose}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Login
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
