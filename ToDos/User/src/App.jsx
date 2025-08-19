import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Task from './Components/Task';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
             <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/task' element={ <Task/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
