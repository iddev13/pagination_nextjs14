import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import prisma, { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

const PAGE_SIZE = 9;

const getCards = async ({ take = PAGE_SIZE, skip = 0 }) => {
	const response = await db.card.findMany({
		take,
		skip,
		orderBy: {
			createdAt: 'asc',
		},
	});
	const total = await prisma.card.count();

	revalidatePath('/');
	return {
		data: response,
		metadata: {
			hasNextPage: skip + take < total,
			totalPages: Math.ceil(total / take),
		},
	};
};

const Home = async (props: PageProps) => {
	const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
	const take = PAGE_SIZE;
	const skip = (pageNumber - 1) * take; // Calculate skip based on page number.
	const { data, metadata } = await getCards({ take, skip });
	console.log('props.searchParams:', props.searchParams);
	console.log('props.params:', props.params);

	return (
		<div className="py-4">
			<div className="container">
				<h1 className="capitalize text-center font-bold text-2xl mb-4">
					cards
				</h1>
				<div className="grid grid-cols-3 gap-5 mb-5">
					{data.map((elem) => {
						return (
							<Card
								href={'/'}
								title={elem.title}
								text={elem.text}
								key={elem.id}
							/>
						);
					})}
				</div>
				<Pagination {...props.searchParams} {...metadata} />
			</div>
		</div>
	);
};

export default Home;
