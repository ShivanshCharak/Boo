import React,{useContext, useState} from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupValidation } from '@/lib/validations';
import  Loader  from '../../components/shared/Loader';
import { error } from 'console';
import useCookie from 'react-use-cookie';
import { SignupContext } from '@/context/SignupContext';


type userData={
  email: "",
  name: "",
  password: "",
  username: ""
}

function SignupForm() {
  const isLoading = false;
  const [cookie,setCookie] = useCookie('')
   const {userData,setUserData} = useContext(SignupContext)
  const nav = useNavigate()
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      username: ""
    }
  });
  

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
   setUserData(values)
    await fetch("http://localhost:3000/auth/signup",{
      method:"POST",
      credentials:'include',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(values)
    }).then(async response=>{
      if(!response.ok){
        console.log(response)
        const error = await response.json()
        console.log(error.message)
      }else{
        const res = await response.json()
        // const refreshToken = response.headers.get("Set-ookie")
        console.log(res)
        nav("/home")
      }
    }).catch(error=>{

      console.error("There was an eror with fetch",error)
    })
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg"/>
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new Account</h2>
        <p className="text-light-3 small-medium md:base-regular">To usee Rpple Hub Enter your details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' placeholder="username" {...field} />
              </FormControl>
              
              <FormMessage className='text-red'/>
            </FormItem>
          )}
          />
           <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' placeholder="username" {...field} />
              </FormControl>
              
              <FormMessage className='text-red'/>
            </FormItem>
          )}
          />
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' placeholder="username" {...field} />
              </FormControl>
              
              <FormMessage className='text-red'/>
            </FormItem>
          )}
          />
           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' placeholder="username" {...field} />
              </FormControl>
              
              <FormMessage className='text-red'/>
            </FormItem>
          )}
          />
        <Button className='shad-button_primary' type="submit">{isLoading?
        <div className='flex-center gap-2'><Loader/> Loading</div>:"Submit"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already Have an account? <Link to="/sign-in" className='text-primary-500 text-small-semibold'>Login</Link>
        </p>
      </form>
          </div>
    </Form>
  
  );
}

export default SignupForm;
