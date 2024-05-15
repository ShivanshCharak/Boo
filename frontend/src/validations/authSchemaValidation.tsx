import * as yup from 'yup'

export const signupSchemaValidator=yup.object({
    username:yup.string().required().max(10,{message:"Cannot be more than 10 characters"}),
    password:yup.string().required().min(10,{message:"Cannot be more than 10 characters"}),
    email:yup.string().required(),
    confirmPassword:yup.string().required().oneOf([yup.ref('password')],"Password must match")
})
