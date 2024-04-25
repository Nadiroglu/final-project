import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import FanClubCategories from './components/FanClubCategories'


function App() {
  const [user, setUser] = useState(null)
  const [fanclub, setFanClub] = useState([])
  const [search, setSearch] = useState('')
  
  console.log(user);

    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await fetch('/api/fan_clubs')

          if (!response.ok){
            throw new Error('Failed to fetch data')
          }
          const data = await response.json()
          // console.log(data);
          setFanClub(data)
        } catch(error) {
          console.error('Error fetching data:', error.message);
        }
      }
      fetchData()
    }, [])


    const filteredClubs = fanclub.filter((club) => {
      return (
        club.sport_type.toLowerCase().includes(search.toLowerCase()) ||
        club.name.toLowerCase().includes(search.toLowerCase())
      )
    })
  



  useEffect(() => {
    fetch('/api/check_session', {
      method: 'GET',
      credentials: 'include'
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    })

  }, [])




  return (
    
    <>
    <h1 className="text-3xl font-bold underline text-red-500">
      Hello world!
    </h1>
      <NavBar search={search} setSearch={setSearch} user = {user}/> 
      <Outlet context={[user]} />
      <FanClubCategories filteredClubs={filteredClubs} />
      <Footer />
    </>
  )
}

export default App
