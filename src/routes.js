import {LOGIN_ROUTE, PANEL_ROUTE, REGISTRATION_ROUTE} from './utils/consts'
import Panel from './pages/Panel'
import Auth from './pages/Auth'

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]

export const authRoutes = [
    {
        path: PANEL_ROUTE,
        Component: Panel
    },
]