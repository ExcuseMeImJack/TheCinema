import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

export const dynamic = 'force-dynamic';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const options = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
  },
};

export async function GET(req: Request) {

}
