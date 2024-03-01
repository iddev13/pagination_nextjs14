import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface contextProps {
	params: {
		id: string;
	};
}

export async function GET(req: Request, context: contextProps) {
	try {
		const { params } = context;
		console.log('context', context);

		const work = await db.card.findFirst({
			where: {
				id: params.id,
			},
		});

		return NextResponse.json(work, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'could not fetch work' },
			{ status: 500 }
		);
	}
}
