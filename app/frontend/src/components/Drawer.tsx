import { Divider, Link, List, ListItem, ListItemText, Stack } from '@mui/material'
import { useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useTranslation } from 'react-i18next'
import { Link as LinkRouter, useLocation } from 'react-router-dom'
import { useLayoutsStyles } from 'src/assets'
import { currentLanguageCode } from 'src/config/i18n'
import { dataPages } from 'src/routes/Menu'
import { Home } from '@mui/icons-material'

const RecommenderDrawer = () => {
    const styles = useLayoutsStyles()
    const location = useLocation()
    const { t, i18n } = useTranslation()

    const [selected, setSelected] = useState(
        currentLanguageCode === 'en' ? 'GB' : currentLanguageCode.toLocaleUpperCase()
    )

    const changeLanguage = (code: string) => {
        const cc = code === 'GB' ? 'en' : code.toLocaleLowerCase()

        i18n.changeLanguage(cc, (err, tr) => {
            tr('key')
        })
        setSelected(code)
    }
    return (
        <Stack sx={{ color: theme => theme.palette.secondary.main, height: '100vh' }}>
            <List>
                <Link underline="none" component={LinkRouter} to={'/'} sx={{color: theme => theme.palette.secondary.main}}>
                    <ListItem>
                        <Home/>
                        <ListItemText primary={t('dataMenu.home')} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                {dataPages.map((item, index) => (
                    <Link
                        key={index}
                        sx={{
                            color: theme => 
                                 location.pathname === `/${item.route?.toLocaleLowerCase()}`
                                    ? theme.palette.primary.main
                                    : theme.palette.secondary.main,
                        }}
                        underline="none"
                        component={LinkRouter}
                        to={`/${item.route?.toLocaleLowerCase()}`}
                    >
                        <ListItem
                            sx={{
                                backgroundColor: theme =>
                                    location.pathname === `/${item.route?.toLocaleLowerCase()}`
                                        ? theme.palette.secondary.main
                                        : theme.palette.primary.main,
                            }}
                        >
                           {item.icon}
                            <ListItemText primary={t(item.title)} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ReactFlagsSelect
                        countries={['GB', 'FR']}
                        placeholder=""
                        fullWidth
                        showOptionLabel={false}
                        showSelectedLabel={false}
                        selected={selected}
                        onSelect={code => changeLanguage(code)}
                    />
                </ListItem>
            </List>
        </Stack>
    )
}
export default RecommenderDrawer
