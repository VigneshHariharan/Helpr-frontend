import React from 'react';
import './App.css';
import './styles/global.scss';
import { getTags } from './shared/utils/utils';
import { Router } from '@reach/router';

import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen';
require('dotenv').config();

const Home = () => <h1>Home</h1>;

function App() {
	return (
		<div className="App">
			<Router>{getTags !== undefined ? <WelcomeScreen path="/" /> : <Home path="/" />}</Router>
		</div>
	);
}

export default App;
