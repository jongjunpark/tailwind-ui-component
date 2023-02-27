import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Examples from '../Examples'

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Examples />}></Route>),
)

export default router
