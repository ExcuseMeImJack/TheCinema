import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ error: "Username is missing" }, { status: 401 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile_pic_url: true,
        is_private: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Username not found" }, { status: 404 })
  }
}
