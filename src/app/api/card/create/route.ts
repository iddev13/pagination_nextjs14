import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		console.log(body);

		const work = await db.card.create({
			data: {
				title: body.title,
				text: body.text,
			},
		});

		return NextResponse.json(work, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
