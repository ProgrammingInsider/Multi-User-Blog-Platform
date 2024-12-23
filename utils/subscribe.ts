'use server'

import prisma from "./db";

export const Subscribe = async (
    state: { message: string; isSubscribed: boolean },
    formData: FormData
) => {
    const email = formData.get("email") as string;
    console.log(email);
    
    // Validate the email
    if (!email || typeof email !== "string") {
        return {
            message: "Invalid email address",
            isSubscribed: false,
        };
    }

    try {
        const checkUser = await prisma.subscriber.findUnique({where:{email}});

        if(!checkUser){
            const subscriber = await prisma.subscriber.create({
                data: { email },
            });

            console.log("Subscriber created:", subscriber);
    
            return {
                message: "Subscribed Successfully",
                isSubscribed: true,
            };
        }else{
            return {
                message: "This email is already subscribed.",
                isSubscribed: false,
            };
        }

    } catch (error: any) {
        console.error("Error subscribing user:", error);

        if (error.code === "P2002") {
            return {
                message: "This email is already subscribed.",
                isSubscribed: false,
            };
        }

        return {
            message: "Something went wrong, please try again",
            isSubscribed: false,
        };
    }
};
