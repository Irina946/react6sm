import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { CreatingProfile } from './pages/creatingProfile/creatingProfile';
import { Registration } from './pages/registration/registration';
import { Entrance } from './pages/entrance/entrance';
import { Main } from './pages/main/main';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/entarnce' element={<Entrance/>} />
        <Route path='/create-profile' element={<CreatingProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
