import Link from 'next/link';

const Header = () => {
	return (
		<header className="border-b-2 border-amber-500">
			<div className="container">
				<div className="h-12 flex items-center justify-between">
					<Link href={'/'} className="uppercase text-2xl font-bold">
						logo
					</Link>
					<nav>
						<ul className="flex items-center gap-4">
							<li>
								<Link href={'/create'}>create</Link>
							</li>
							<li>
								<Link href={'/'}>link</Link>
							</li>
							<li>
								<Link href={'/'}>link</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
