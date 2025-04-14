import { RouterProvider as ReactRouterProvider } from 'react-router-dom'
import Routes from './routes'

const RouterProvider = () => {
    return <ReactRouterProvider router={Routes} />
}

export default RouterProvider