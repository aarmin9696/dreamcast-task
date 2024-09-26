import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserTable from './components/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <div className="App p-3">
        <h1>User Management</h1>
        <UserTable />
      </div>
    </Provider>
  );
}

export default App;

