import { Route, Routes } from 'react-router-dom'
import HomePage from './home'
import DetailPage from './detailPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> }>
      </Route>
      <Route path="/detail/:id" element={ <DetailPage /> }>
      </Route>
    </Routes>
  )
}

export default App
