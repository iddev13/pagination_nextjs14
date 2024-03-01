import Link from 'next/link';
import { FC } from 'react';

interface ICard {
	href: string;
	title: string;
	text: string;
	key?: string | number;
}

const Card: FC<ICard> = ({ href, title, text, key }) => {
	return (
		<article
			className="border rounded p-2 flex flex-col h-56 overflow-hidden"
			key={key}
		>
			<h1 className="capitalize font-bold">{title}</h1>
			<p className="flex-auto text-[70px] text-center font-bold">{text}</p>
			<Link
				href={href}
				className="bg-green-500 rounded py-2 px-4 capitalize inline-flex hover:bg-green-600 transition"
			>
				go
			</Link>
		</article>
	);
};

export default Card;
