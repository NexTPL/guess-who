import { TextField } from '@mui/material';
import { useRef } from 'react';

const Cards = (props) => {
	const cards = useRef([{}]);
	const string = useRef('');

	const Convert = () => {
		cards.current = [];

		const lines = string.current.split('\n').filter((n) => n);
		if (!lines[0]) return;
		for (let i = 0; i < lines.length; i++) {
			const card = lines[i].split(' ').filter((n) => n);
			cards.current.push({
				url: card[0],
				name: card[1],
				id: i,
			});
		}
		props.cards(cards.current);
	};

	return (
		<TextField
			label='Links'
			placeholder='Paste links here'
			multiline
			color='primary'
			fullWidth
			maxRows={30}
			defaultValue={string.current}
			onChange={(event) => {
				string.current = event.target.value;
				Convert();
			}}
		/>
	);
};

export default Cards;
