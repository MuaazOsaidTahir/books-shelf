import { NextResponse } from "next/server";
import "../../_db/mongo";
import { cookies } from "next/headers";
import { booksModel, userModel } from "../../_db/schema";
import { Types } from "mongoose";

export async function GET(req: Request) {

    const token = cookies().get("book-shelf-token")?.value;
    if (!token) {
        return NextResponse.json({ message: "User not loggedin" }, { status: 401 });
    }

    const user = await userModel.findById(token);

    if (!user) {
        return NextResponse.json({ message: "User doesn't exist" }, { status: 404 });
    }

    return NextResponse.json({id: user._id, email: user.email, name: user.name}, { status: 200 });
}

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const data = await req.json();

        if (searchParams.get("type") === "create") {
            try {
                const new_user = new userModel(data);

                await new_user.save();

                cookies().set("book-shelf-token", new_user._id ?? "", {
                    path: "/",
                    expires: new Date(Date.now() + 604800000),
                });

                return NextResponse.json({ id: new_user._id, name: new_user.name, email: new_user.email }, {
                    status: 201, headers: {
                        "Set-Cookie": cookies().toString()
                    }
                });
            } catch (error: any) {
                console.log(error.message);
                return NextResponse.json({ message: "Interrnal Server Error" }, { status: 500 });
            }
        } else if (searchParams.get("type") === "login") {
            try {
                const alreadyUser = await userModel.findOne({ $and: [{ email: data.email }, { password: data.password }] });
                if (!alreadyUser) {
                    return NextResponse.json({ message: "User doesn't exist" }, { status: 500 });
                }
                cookies().set("book-shelf-token", alreadyUser._id ?? "");
                return NextResponse.json({ id: alreadyUser._id, name: alreadyUser.name, email: alreadyUser.email }, { status: 200 });
            } catch (error: any) {
                console.log(error.message);
                return NextResponse.json({ message: "Error Occured" }, { status: 500 });
            }
        }
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const token = cookies().get("book-shelf-token")?.value;
        if (!token) {
            return NextResponse.json({ message: "User not loggedin" }, { status: 401 });
        }

        const user = await userModel.findById(token);

        if (!user) {
            return NextResponse.json({ message: "User doesn't exist" }, { status: 404 });
        }

        await booksModel.deleteMany({ user: new Types.ObjectId(token) });
        await userModel.findByIdAndDelete(token);

        return NextResponse.json({ message: "Sucess" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}