"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { BottomGradient, Input, LabelInputContainer } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/api";
import { logIn } from "@/types/types";
import { GlobalContext } from "@/context/Provider";

export default function SignupFormDemo() {
    const { register, handleSubmit, formState: { errors } } = useForm<logIn>();
    const router = useRouter();
    const context = useContext(GlobalContext);

    const onSubmit = async (data: logIn) => {
        try {
            const res = await loginUser(data);
            if (res?.data?.email) {
                context?.setUser(res.data)
                router?.push("/books");
                return;
            }
            alert("User Not Found")
        } catch (err: any) {
            console.log("Page Error: ", err.message)
            alert(err.message)
        }
    };

    return (
        <>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Welcome Back
            </p>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)} >
                {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Full name</Label>
            <Input id="firstname" placeholder="Full Name" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="9lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div> */}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input formHook={register("email", { required: "Email is required!" })} id="email" placeholder="projectmayhem@fc.com" type="email" />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.email?.message}
                    </span>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input formHook={register("password", { required: "Password is required!" })} id="password" placeholder="••••••••" type="password" />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.email?.message}
                    </span>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign In &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <p className="flex flex-col items-center justify-center text-center text-md text-gray-500">
                    <span>Don't have an account?</span>
                    <Link href="/signup"
                        className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign Up</Link>
                </p>
            </form>
        </>
    );
}
