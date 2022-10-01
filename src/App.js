import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import { useState } from 'react'
import { UserContext } from './components/UserContext/UserContext'

const App = () => {
    const [token, setToken] = useState(null)

    return (
        <UserContext.Provider value={token}>
            <Router>
                <Routes>
                    <Route path='/' element={<Login setToken={setToken} />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}

export default App