import Connection  from "@/database/config";
import { NextResponse}  from 'next/server';


Connection();

export const GET = async (NextRequest) => {
  try{
    const response = NextResponse.json({message: "logout successful",success: true});

    response.cookies.set('token' , "", {httpOnly: true, expires: new Date(0)}); // set the token to empty string and set the expires date to 0 to delete the cookie

    return response; 
  }
  catch(error){
    console.log(error);
    return new Response("Something went worng", {status: 500});

  }

}