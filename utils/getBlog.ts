'use server'

import { cookies } from "next/headers";
import prisma from "./db";
import jwt, {JwtPayload} from "jsonwebtoken";

export const getBlog = async(id:string) => {

    if(id){
        try{
            const fetchedBlog = await prisma.blog.findFirst({
                where: { id },
                include: {
                    user: true, 
                    blogTags: { 
                        include: {
                            tag: true, 
                        },
                    },
                },
            });

            return {
                result: fetchedBlog,
                status: true
            }
            
        }catch(error){
            return {
                message: "Something went wrong please try again",
                status: false
            }
        }

    }else{
        return {
            message: "Something went wrong please try again",
            status: false
        }
    }
};

// export const getBlog = async(id:string) => {
//     const cookiesStore = await cookies()
//     const accessToken = cookiesStore.get('accessToken')?.value

//     if(accessToken && id){
//         try{
//             if(process.env.ACCESS_TOKEN){
//                 const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN) as JwtPayload
//                 if(decoded?.id){
//                     const fetchedBlog = await prisma.blog.findFirst({
//                         where: { id },
//                         include: {
//                             user: true, 
//                             tags: true,
//                         },
//                     });
                    

//                     console.log(fetchedBlog);
                    
                    
//                 }

//             }
//         }catch(error){

//         }

//     }else{
//         return {
//             message: "Please Login First",
//             status: false
//         }
//     }

//     return {

//     }
// };