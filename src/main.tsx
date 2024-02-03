import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CssBaseline, ThemeProvider, createTheme, darkScrollbar } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffffff',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: (themeParam: { palette: { mode: string } }) => ({
				body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
			}),
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);

export default App;
