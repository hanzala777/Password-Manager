import Navbar from './components/Navbar' 
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className='sticky top-0'>
        <Navbar/>
      </div>
     <Manager/>
     <Footer/> 
    </>
  )
}

export default App
