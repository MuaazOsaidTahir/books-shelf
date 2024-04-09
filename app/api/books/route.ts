import { NextResponse } from "next/server";
import "../_db/mongo";
import { cookies } from "next/headers";
import { Types } from "mongoose";
import { booksModel, userModel } from "../_db/schema";

export const GET = async (req: Request) => {
    try {
        // console.log(cookies().get("book-shelf-token"));
        const token = cookies().get("book-shelf-token")?.value;
        if (!token) {
            return NextResponse.json({ message: "User not loggedin" }, { status: 401 });
        }

        const user = await userModel.findById(token);

        if (!user) {
            return NextResponse.json({ message: "User doesn't exist" }, { status: 404 });
        }

        const books = await booksModel.aggregate([
            {
                $match: { user: new Types.ObjectId(token) }
            },
            {
                $group: {
                    _id: '$status',
                    data: { $push: '$$ROOT' }
                }
            },
            // {
            //     $group: {
            //         _id: null,
            //         data: { $push: { k: '$_id', v: '$data' } }
            //     }
            // },
            // {
            //     $replaceRoot: {
            //         newRoot: { $arrayToObject: '$data' }
            //     }
            // }
        ],
            { maxTimeMS: 60000, allowDiskUse: true }
        );

        const mappedBooks = books.reduce((acc, curr) => {
            // console.log(curr._id, curr.data);

            acc[curr._id] = curr.data;
            return acc;
        }, {});

        return NextResponse.json({ books: mappedBooks }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const PUT = async (req: Request) => {
    try {
        const data = await req.json();

        console.log(data);

        if (!data.id) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 404 });
        }

        const book = await booksModel.findByIdAndUpdate(data.id, data.status);

        if (!book) {
            return NextResponse.json({ message: "Book Doesn't exists" }, { status: 404 });
        }
        return NextResponse.json({ message: "Book Status Updated Successfully" }, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export const POST = async (req: Request) => {
    try {
        const token = cookies().get("book-shelf-token")?.value;
        if (!token) {
            return NextResponse.json({ message: "User not loggedin" }, { status: 401 });
        }
        const data = await req.formData();

        const file = data.get("file") as File;
        const book = JSON.parse(data.get("book") as string);

        const newBook = new booksModel({
            img: Buffer.from(await file.arrayBuffer()),
            genre: book.genre,
            title: book.title,
            author: book.author,
            // status: "PLAN",
            user: token,
            published_at: new Date(book.published_at).toISOString()
        });

        await newBook.save();

        return NextResponse.json({ message: "Successful", isSuccess: true })

    } catch (error: any) {
        console.log("BOOKS POST ERROR: ", error.message);
        return NextResponse.json({ message: "An Error Occurred", isSuccess: false })
    }
}