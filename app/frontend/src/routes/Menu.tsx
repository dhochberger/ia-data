import { Download, LibraryBooks, Analytics } from '@mui/icons-material'

type MenuRouteType = {
    title: string
    route: string
    icon: JSX.Element
}

export const dataPages: MenuRouteType[] = [
    { title: 'dataMenu.analysis', route: 'analysis', icon: <Analytics /> },
    { title: 'dataMenu.library', route: 'library', icon: <LibraryBooks /> },
    { title: 'dataMenu.predict', route: 'predict', icon: <Download /> },
]
