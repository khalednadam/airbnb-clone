"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register,
        handleSubmit,
        formState: {
            errors, 
        }    
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        axios.post('/api/register', data)
        .then(() =>{
            RegisterModal.onClose();
        })
        .catch((err) =>{
            toast.error('Something Went Wrong')
        })
        .finally(() =>{
            setIsLoading(false);
        })
    }
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account" />
            <Input id="email" label="Email" register={register} disabled={isLoading} errors={errors} required />
            <Input id="name" label="Name" register={register} disabled={isLoading} errors={errors} required />
            <Input id="password" label="Password" register={register} disabled={isLoading} errors={errors} required type="password" />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outlined label="Continue with google" icon={FcGoogle} onClick={() => {}}  />
            <Button outlined label="Continue with Github" icon={AiFillGithub} onClick={() => {}}  />
            <div className="
            text-neutral-500
            text-center
            mt-4
            font-light
            ">
                <div className="flex items-center gap-2 justify-center">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={RegisterModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>
        </div>
    )

    return (  
        <Modal 
        disabled={isLoading}
        isOpen={RegisterModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={RegisterModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}
 
export default RegisterModal;