import { Box, Button, MenuItem, Modal, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Settings = (props: any) => {
	const seed = useRef('');
	const cards = useRef([{}]);
	const limit = useRef('20');
	const selected = useRef('');
	const string = useRef('');
	const [template, setTemplate] = useState('');
	const [templates, setTemplates] = useState([{ name: 'Loading', cards: [{}], id: 0 }]);

	useEffect(() => {
		getTemplates();
	}, []);

	const getTemplates = async () => {
		await getDocs(collection(db, 'templates')).then((querySnapshot) => {
			const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: +doc.id }));
			setTemplates([...newData, { name: 'Own', id: newData.length }]);
		});
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
		props.data({ cards: final, player: selected.current });
	};

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
		console.log(cards.current);
		Seed();
	};

	const handleChange = (e: string) => {
		setTemplate(e);
		if (+e !== templates.length - 1) {
			cards.current = templates[+e].cards;
			seed.current = '';
			Seed();
		} else {
			Convert();
		}
	};

	const addTemplate = async () => {
		// TODO ADD LOGIC
		const templatesRef = collection(db, 'templates');
		await setDoc(doc(templatesRef, `${templates.length - 1}`), {});
	};

	return (
		<Modal open={props.open} onClose={props.close} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
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
						// onChange={(event) => {
						// 	selected.current = +event.target.value > 0 ? event.target.value : '';
						// 	Encode();
						// }}
					/>
				</Box>
				<TextField select value={template} label='Template' onChange={(e) => handleChange(e.target.value)}>
					{templates.map((temp) => (
						<MenuItem value={temp.id} key={temp.id}>
							{templates[temp.id].name}
						</MenuItem>
					))}
				</TextField>
				{+template == templates.length - 1 && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<TextField
							label='Links'
							placeholder='url name'
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
						<Button
							onClick={() => addTemplate()}
							disabled
							sx={{
								width: '130px',
								backgroundColor: '#1E1E1E',
								marginX: 'auto',
							}}
						>
							Add Template
						</Button>
					</Box>
				)}

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
