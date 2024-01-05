// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import ToDoList from './Components/ToDoList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<ToDoList/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
