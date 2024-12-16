'use server'

import { z } from "zod";
import prisma from "./db";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { revalidatePath } from "next/cache";

type RegisterResponse = {
    message: string;
    errors?: Record<string, string[] | undefined>,
};

export const createUser = async (
  state: { message: string | null, errors?: Record<string, string[] | undefined> },
  formData: FormData
): Promise<RegisterResponse> => {

    const UserValidation = z.object({
        firstName: z.string().nonempty("First Name is required."),
        lastName: z.string().nonempty("Last Name is required."),
        email: z.string().email("Invalid email address."),
        password: z.string().min(8, "Password must be at least 8 characters long."),
        confirmPassword: z.string().nonempty("Confirm Password is required."),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], 
    });


    try {
        const formValues = Object.fromEntries(formData.entries());
        UserValidation.parse(formValues);
        
        const inputValues = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        
        const checkUser:{} | null = await prisma.user.findUnique({where:{email:inputValues.email}})
        if(!checkUser){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(inputValues.password,salt);

            await prisma.user.create({data:{...inputValues,password:hashedPassword}});
            
            return { message: "Registered Successfully" };
        }else{
            return {
                message: '',
                errors: {email:["This email is already taken."]},
            };
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            
            return {
                message: '',
                errors: error.flatten().fieldErrors,
            };
        }
        return {
            message: '',
            errors: {root:["Something went wrong. Please try again!"]},
        };
    }
};

type LoginResponse = {
    message: string,
    errors?: Record<string, string[] | undefined>,
    isLoggedIn?: boolean,
    accessToken?: string,
    userId?: string
};

export const login =  async(
    state:{
        message: string | null, 
        errors?: Record<string, string [] | undefined>,
        isLoggedIn?:boolean,
        accessToken?: string | null,
        userId?: string | null
    },
        formData:FormData): Promise<LoginResponse> =>  {
    const inputValidation = z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().nonempty('Password is required')
    })
    const formValues = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    try{
        inputValidation.parse(formValues);

        const checkUser = await prisma.user.findUnique({where:{email:formValues.email}})
        if(checkUser){
            const isMatch = await bcrypt.compare(formValues.password,checkUser.password);
            if(isMatch){

                if(process.env.ACCESS_TOKEN && process.env.REFRESH_TOKEN){
                    const payload:{id:string} = {id:checkUser.id}

                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '2d' });

                    const cookieStore = await cookies();
                    
                    cookieStore.set('accessToken', accessToken, {
                        path: '/', 
                        httpOnly: true, 
                        secure: process.env.NODE_ENV === 'production', 
                        sameSite: 'strict', 
                        maxAge: 2 * 24 * 60 * 60,

                    });

                    return{
                        message:'LoggedIn Succesfully',
                        isLoggedIn:true,
                        accessToken: accessToken,
                        userId:checkUser.id
                    }
                    
                }
                
            }else{
                return{
                    message:'',
                    isLoggedIn:false,
                    errors:{password:['Incorrect password']}
                }
            }
        }else{
            return{
                message:'',
                isLoggedIn:false,
                errors:{email:['Incorrect email']}
            }
        }
        

        return {
            message: "LoggedIn Successfully",
            isLoggedIn:false
        }
        
    }catch(error){

        if(error instanceof z.ZodError){
            return {
                message: '',
                isLoggedIn:false,
                errors: error.flatten().fieldErrors,
            }
        }

        return {
            message: 'An unexpected error occurred. Please try again later.',
            isLoggedIn:false,
            errors: {root:['Something went wrong, Please try again!']}
        }
    }
}
