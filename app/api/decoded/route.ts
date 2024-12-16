import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

const secret = process.env.ACCESS_TOKEN;
export const GET = async() => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken && secret) {
        try {
            const { id } = jwt.verify(accessToken, secret) as { id: string };
            return new Response(JSON.stringify({ id }), { status: 200 });
        } catch (error) {
            if(error){
                return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
            }
        }
    } else {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
}