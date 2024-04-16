import { Box, Button, Modal, TextField } from '@mui/material';
import { useRef } from 'react';
import Cards from './Cards';

const Settings = (props: any) => {
	const seed = useRef('');
	const cards = useRef([{}]);
	const limit = useRef('20');
	const selected = useRef('');

	const Seed = () => {
		const list = [];
		if (seed.current.split(';').filter((n) => n).length === 0) {
			for (let i = 0; i < cards.current.length; i++) list.push(i);
			for (let i = 0; i < +limit.current && list.length != 0; i++) {
				const j = Math.floor(Math.random() * list.length);
				seed.current += list[j] + ';';
				list.splice(j, 1);
			}
			navigator.clipboard.writeText(seed.current); // seed to clipboard
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
		if (+selected.current <= final.length && final.length > 0)
			props.data({ cards: final, player: selected.current });
	};

	const HandleCards = (data: []) => {
		cards.current = data;
		Seed();
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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						gap: '10px',
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
						label='Character ID'
						placeholder='RANDOM'
						color='primary'
						maxRows={30}
						defaultValue={selected.current}
						onChange={(event) => {
							selected.current = +event.target.value > 0 ? event.target.value : '';
							Encode();
						}}
					/>
				</Box>
				<Cards cards={HandleCards} />

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
