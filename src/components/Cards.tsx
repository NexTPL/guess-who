import { MenuItem, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import mytemplate from '../assets/template.json';

const Cards = (props: any) => {
	const cards = useRef([{}]);
	const string = useRef('');
	const [template, setTemplate] = useState('');
	const templates = [
		{ ...mytemplate, id: 0 },
		{ name: 'New', id: 1 },
	];

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

	const handleChange = (e: string) => {
		setTemplate(e);
		if (+e !== templates.length - 1) props.cards(templates[+e].cards);
	};

	return (
		<>
			<TextField select value={template} label='Template' onChange={(e) => handleChange(e.target.value)}>
				{templates.map((temp) => (
					<MenuItem value={temp.id} key={temp.id}>
						{templates[temp.id].name}
					</MenuItem>
				))}
			</TextField>
			{template == '1' && (
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
			)}
		</>
	);
};

export default Cards;
