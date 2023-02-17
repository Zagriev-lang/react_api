import './App.css';
import Home from './components/Home';
import { useEffect, useState, uuid } from 'react';

import {BrowserRouter as  Router,
  Routes,
  Route,
  Link,
  Navigate
  } from 'react-router-dom'
import Reg from './components/Reg';
import Log from './components/Log';
import Basket from './components/Basket';
import Order from './components/Order';
import { DataContext } from './components/Context';
import Loading from './components/Loading'

function App() {

  const [pets, setPets] = useState()
  const [isLoad, setIsLoad] = useState(true)


  let initAccounts = [
    {id:1, name: 'IVAN', age:22, password: 'Qwerty123', basket: [], order: []},
    {id:2, name: 'admin', age:1, password: 'admin', basket: [], order: []},
    {id:3, name: 'DASHA', age:17, password: '123', basket: [], order: []}
  ]


  const [accounts, setAccounts] = useState(initAccounts)

  const [user, setUser] = useState(null)


  async function GetPets() {
    setIsLoad(true)
    const api = await fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=avaliable')
    const data = await api.json()
    setPets(data)
    setIsLoad(false)
    console.log(data);
  }

  useEffect(() => {
    GetPets()
  }, [])


    return <Router>
      <header className='header'>
        <nav className='menu'>
          <ul className='list'>
            <li className='link'>{user !== null ? <p>Здравствуйте, {user.name}</p> : ''}</li>
            {user !== null ? <><li className='link'><a className='logout' onClick={() => setUser(null)}>Выйти</a></li> <li className='link'><Link to='/basket'>Корзина</Link></li></> : <><li className='elem'><Link to='/reg'>Регистрация</Link></li>
            <li className='link'><Link to='/log'>Войти</Link></li><li className='link'><Link>Заказ</Link></li></>}
            <li className='link'><Link to='/' >Домой</Link></li>
          </ul>
        </nav> 
      </header>
      <section className='container'>
      {isLoad ? <Loading/> : 
      <DataContext.Provider value={{user, setUser, accounts, setAccounts, pets}}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/reg' element={user ? <Navigate to="/" /> :  <Reg />} />
            <Route path='/log' element={user ? <Navigate to="/" /> :  <Log />} />
            <Route path='/basket'element={!user ? <Navigate to="/" /> : <Basket />} />
            <Route path='/order'element={!user ? <Navigate to="/" /> : <Order />} />
      </Routes>
      </DataContext.Provider>
      }
      </section>
    </Router>  
}
export default App;
