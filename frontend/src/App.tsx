import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from 'react-router-dom';
import HomePage from './pages/Home.tsx'
import MainLayout from "./layouts/MainLayout.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='*' element={<div>Not Found</div>} />
        </Route>
    )
)

const App = () => {
    return <RouterProvider router={router} />
}

export default App;