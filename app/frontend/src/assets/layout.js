import makeStyles from '@mui/styles/makeStyles'
import styles from './styles'

const theme = styles.theme

const useLayoutsStyles = makeStyles(() => ({
    container: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 100,
    },
    card: {
        borderRadius: '8px',
        border: `solid 2px ${theme.palette.secondary.main}`,
        /* width: '100%',
        margin: '0.5rem', */
        //padding: 1,
    },
    menu: {
        backgroundColor: theme.palette.primary.main,
    },
}))

export default useLayoutsStyles
