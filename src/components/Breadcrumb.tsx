import React from 'react';

interface IProps {
	list: string[];
}

export const Breadcrumb = (props: IProps) => {
	const list: string[] = props.list || [];
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb-category d-md-flex">
				{list.map((el, i, arr) => {
					const isStrong = i === arr.length - 1 ? '__highlight' : '';
					return (
						<li
							key={i}
							className={`breadcrumb-category__item${isStrong}`}
							aria-current="page">
							{el}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};
