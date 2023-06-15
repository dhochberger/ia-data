import { Grid, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import logo from './image/logo_fondtransparent.png';

const App: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Grid container spacing={2} sx={{height: '100vh'}}>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <img src={logo} alt="Logo" width="400" height="400" />
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{fontSize: '25px', textAlign:'center'}}>{t('homePage.summary')}
                </Typography>
            </Grid>
        </Grid>
    )
}
export default App
