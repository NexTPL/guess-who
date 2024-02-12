import { Box, Button, Modal, TextField } from '@mui/material';
import { useRef } from 'react';

const Settings = (props: any) => {
	const string = useRef('');
	const seed = useRef('');
	const cards = useRef([{}]);
	const limit = useRef('20');

	const Cards = () => {
		cards.current = [];
		seed.current = '';

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
		Seed();
	};

	const Seed = () => {
		const list = [];

		if (seed.current.split(';').filter((n) => n).length === 0) {
			for (let i = 0; i < cards.current.length; i++) list.push(i);
			for (let i = 0; i < +limit.current && list.length != 0; i++) {
				const j = Math.floor(Math.random() * list.length);
				seed.current += list[j] + ';';
				list.splice(j, 1);
			}
		}
		Encode();
	};

	const Encode = () => {
		const final = [{}];
		final.splice(0, 1); // typescript error
		const filtered = seed.current.split(';').filter((n) => n);
		for (let i = 0; i < filtered.length; i++) {
			if (cards.current[+filtered[i]]) final.push(cards.current[+filtered[i]]);
			else {
				seed.current = '';
				Seed(); // generate new valid seed
				return; // prevent from undefined
			}
		}
		props.data(final);
	};

	return (
		<Modal
			open={props.open}
			onClose={props.close}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box
				sx={{
					height: '100vh',
					backgroundColor: '#000000',
					margin: 'auto',
					padding: 3,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<TextField
					label='Seed'
					placeholder='Leave empty for new one'
					color='primary'
					fullWidth
					defaultValue={seed.current}
					onChange={(event) => {
						seed.current = event.target.value;
						Seed();
					}}
				/>
				<TextField
					label='Quantity'
					placeholder=' '
					color='primary'
					type='number'
					defaultValue={limit.current}
					onChange={(event) => {
						limit.current = +event.target.value > 0 ? event.target.value : '1';
						seed.current = '';
						Seed();
					}}
				/>
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
						Cards();
					}}
				/>
				<Button
					onClick={props.close}
					sx={{
						width: '130px',
						backgroundColor: '#1E1E1E',
						marginX: 'auto',
					}}
				>
					Close
				</Button>
			</Box>
		</Modal>
	);
};

export default Settings;
