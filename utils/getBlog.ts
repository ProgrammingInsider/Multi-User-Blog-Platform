'use server'

import prisma from "./db";

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