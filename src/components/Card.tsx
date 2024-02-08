import { Paper, Box } from '@mui/material';
import { useState } from 'react';

const Card = (props: any) => {
	const [Overlay, SetOverlay] = useState(false);
	return (
		<Paper
			onClick={() => {
				SetOverlay(!Overlay);
			}}
			elevation={10}
			sx={{
				padding: 2,
				borderRadius: 5,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 2,
				color: props.id !== props.player ? '#FFFFFF' : '#1CEE42',
				border: 4,
				opacity: Overlay ? (props.id === props.player ? '60%' : '30%') : '100%',
			}}
		>
			<Box
				component={'img'}
				sx={{
					borderRadius: 3,
					width: '160px',
					height: '160px',
					boxShadow: 5,
				}}
				src={props.url}
				alt='img'
			></Box>
			<Box
				sx={{
					boxShadow: 5,
					width: '160px',
					bgcolor: '#6d6d6d',
					borderRadius: 2,
					textAlign: 'center',
					fontSize: '20px',
					padding: 1,
					color: '#ffffff',
				}}
			>
				{props.name}
			</Box>
		</Paper>
	);
};

export default Card;
