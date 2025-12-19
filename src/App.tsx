import { useCallback } from 'react';
import './App.css';
import { Button } from './components/Button';
import { DataTable } from './components/dataTable/DataTable';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<DataTable />
			</header>
		</div>
	);
}

export default App;
