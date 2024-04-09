'use server'
import { SignUp, logIn, types } from "@/types/types";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    try {
        const res = await fetch(process.env.URL + "/api/user", {
            headers: { Cookie: cookies().toString() }
        });

        if (res.ok) {
            const data = await res.json()
            return data;
        }
        return false
    } catch (error: any) {
        console.log(error.message);
        return false
    }
}

export const signupUser = async (formData: SignUp): Promise<{ data?: SignUp, isSuccess?: boolean }> => {
    const res = await fetch(process.env.URL + "/api/user?type=create", {
        method: "POST",
        body: JSON.stringify(formData)
    });

    const data = await res.json();

    cookies().set("book-shelf-token", data.id);

    if (res.ok) {
        return { data: data };
    } else {
        return { isSuccess: false }
    }
}

export const loginUser = async (formData: logIn): Promise<{ data?: SignUp, isSuccess?: boolean }> => {
    const res = await fetch(process.env.URL + "/api/user?type=login", {
        method: "POST",
        body: JSON.stringify(formData)
    });

    const data = await res.json();

    cookies().set("book-shelf-token", data.id);

    if (res.ok) {
        return { data };
    } else {
        return { isSuccess: false }
    }
}

export const getBooks = async () => {
    try {
        const res = await fetch(process.env.URL + "/api/books", {
            headers: { Cookie: cookies().toString() }
        });
        const data = await res.json();

        if (res.ok) {
            return { books: data?.books, isSuccess: true };
        }
        return { message: data?.message, isSuccess: false };
    } catch (error: any) {
        console.log(error.message);
        return { isSuccess: false }
    }
}

export const updateBook = async (body: { id: string, status: { status: types } }) => {
    try {
        const res = await fetch(process.env.URL + "/api/books", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: { Cookie: cookies().toString() }
        });

        const data = await res.json();

        return data;
    } catch (error: any) {
        console.log(error.message);
        return { isSuccess: false, message: "Internal Server Error" };
    }
}

export const uploadBook = async (data: FormData) => {
    try {
        const res = await fetch(process.env.URL + "/api/books", {
            method: "POST",
            body: data,
            headers: { Cookie: cookies().toString() }
        });

        const body = await res.json();

        return body;

    } catch (error: any) {
        console.log("UPLOAD BOOK ERROR: ", error.message);
        return { isSuccess: false }
    }
}

export const deleteUser = async () => {
    try {
        const res = await fetch(process.env.URL + "/api/user", {
            method: "DELETE",
            headers: { Cookie: cookies().toString() }
        });

        if (res.ok) {
            cookies().delete('book-shelf-token');
            return true;
        }
        return false;
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
}