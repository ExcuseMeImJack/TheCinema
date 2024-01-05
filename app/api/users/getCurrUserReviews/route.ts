import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";
import { Session, getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(null, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      },
      select: {
        id: true,
        email: true,
        username: true,
        Reviews: true
      }
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
