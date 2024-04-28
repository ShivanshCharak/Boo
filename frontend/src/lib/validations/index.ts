import * as z from 'zod'

export const SignupValidation = z.object({
    name:z.string().min(2,{message:"Too short"}).max(20,{message:"Too long"}),
    username:z.string().min(2,{message:"Too short"}).max(20,{message:"Too long"}),
    password:z.string().min(8,{message:"Password must be atleast 8 character"}),
    email:z.string().email()

})
export const PostValidation = z.object({
    caption:z.string().min(5,{message:"Too short"}).max(2002,{message:"Too long"}),
    file:z.custom<File[]>(),
    location:z.string().min(2,{message:"Too short"}).max(200,{message:"Too long"}),
    tags:z.string(),
}

)