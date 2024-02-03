import { Button, Container, Paper, Typography } from '@mui/material';
import './App.css';
import { useState } from 'react';
import Card from './components/Card';
import Settings from './components/Settings';

const App = () => {
	const [Open, SetOpen] = useState(false);
	const [Data, SetData] = useState([
		{
			url: 'https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg',
			name: '?',
			id: 0,
		},
	]);

	const DataHandler = (data: []) => {
		SetData(data);
	};

	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				gap: 5,
			}}
		>
			<Paper
				variant='elevation'
				elevation={1}
				sx={{
					textAlign: 'center',
					p: 2,
					width: '400px',
					margin: 'auto',
					borderRadius: 4,
					boxShadow: 10,
				}}
			>
				<Typography variant='h2' color='primary'>
					Guess <strong>Who</strong>?
				</Typography>
			</Paper>
			<Paper
				variant='elevation'
				elevation={1}
				sx={{
					padding: 3,
					borderRadius: 5,
					display: 'flex',
					flexDirection: 'row',
					gap: 3,
					boxShadow: 5,
					flexWrap: 'wrap',
					justifyContent: 'space-evenly',
				}}
			>
				{Data.map((card) => (
					<Card name={card.name} url={card.url} key={card.id} />
				))}
			</Paper>
			<Button
				onClick={() => SetOpen(!Open)}
				sx={{
					width: '130px',
					backgroundColor: '#000000',
					margin: 'auto',
				}}
			>
				Settings
			</Button>
			<Settings close={() => SetOpen(false)} open={Open} data={DataHandler} />
		</Container>
	);
};

export default App;
