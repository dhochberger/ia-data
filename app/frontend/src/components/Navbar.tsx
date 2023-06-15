import { AppBar, Toolbar } from '@mui/material'
import { useLayoutsStyles } from 'src/assets'

const Navbar = () => {
    const styles = useLayoutsStyles()

    return (
        <AppBar position="fixed">
            <Toolbar className={styles.menu}></Toolbar>
        </AppBar>
    )
}
export default Navbar
