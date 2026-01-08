import { NextResponse } from "next/server";
import { 
  deleteUser, 
  getUserById,
  UserServiceError
} from "@/data/services/user.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");
  
    const user = await getUserById(userId!);
  
    return NextResponse.json(
      user, { status: 200 }
    );
  } catch(error) {
    if (error instanceof UserServiceError) {
      return NextResponse.json(
        { error: error.message }, 
        { status: error.status }
      );
    };

    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  };
};

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user_id");
    const response = await deleteUser(userId!);

    return NextResponse.json(
      response, { status: 200 }
    );
  } catch (error) {
    if (error instanceof UserServiceError) {
      return NextResponse.json(
        { error: error.message }, 
        { status: error.status }
      );
    };

    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  };
}