import { Box, Modal, TextField } from '@mui/material';
import { useRef } from 'react';

const Settings = (props: any) => {
	const string = useRef('');
	const seed = useRef('');
	const cards = useRef([{}]);

	const Process = () => {
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

		// Seed

		if (seed.current.trim() == '') {
			let list = [];
			for (let i = 0; i < cards.current.length; i++) list.push(i);
			for (let i = 0; i < 20 && list.length != 0; i++) {
				const j = Math.floor(Math.random() * list.length);
				seed.current += list[j] + ';';
				list.splice(j, 1);
			}
		}

		// Encode

		let final = [{}];
		final.splice(0, 1); // typescript error
		const filtered = seed.current.split(';').filter((n) => n);
		for (let i = 0; i < filtered.length; i++) {
			final.push(cards.current[+filtered[i]]);
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
					width: '90vw',
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
					placeholder='Leave empty for new one'
					multiline
					color='primary'
					fullWidth
					defaultValue={seed.current}
					onBlur={(event) => {
						seed.current = event.target.value;
						Process();
					}}
				/>
				<TextField
					placeholder='Paste Links here'
					multiline
					color='primary'
					fullWidth
					defaultValue={string.current}
					onBlur={(event) => {
						string.current = event.target.value;
						Process();
					}}
					sx={{
						overflowY: 'scroll',
					}}
				/>
			</Box>
		</Modal>
	);
};

export default Settings;
