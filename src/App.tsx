import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { CreatingProfile } from './pages/creatingProfile/creatingProfile';
import { Registration } from './pages/registration/registration';
import { Entrance } from './pages/entrance/entrance';
import { Main } from './pages/main/main';
import Layot from './components/Layot';
import { CustomerFeed } from './pages/customerFeed/customerFeed';


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layot />}>
          <Route path='/registration' element={<Registration />} />
          <Route path='/entarnce' element={<Entrance />} />
          <Route path='/create-profile' element={<CreatingProfile />} />
          <Route path='/customerFeed' element={<CustomerFeed />} />
        </Route>
        <Route path='/' element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
