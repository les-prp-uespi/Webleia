import { HomePage, TextPage } from '../../pages'

export const CommonRoutes = [
    {
        index: true,
        element: <HomePage />
    },
    {
        path: "texto/:id/:generoId",
        element: <TextPage />
    }
]