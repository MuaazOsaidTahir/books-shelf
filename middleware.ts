import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "./api/api";

export async function middleware(request: NextRequest) {
    const res = await getCurrentUser();

    if (!res) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: "/books"
}