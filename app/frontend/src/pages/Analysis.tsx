import { Grid, Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { ChartFour, ChartOne, ChartThree, ChartTwo } from './AnalysisComponent'
import CategoryAnalysis from './AnalysisComponent/CategoryAnalysis'

const Analysis: FunctionComponent = () => {
    const { t } = useTranslation()

    return (
        <Stack sx={{ padding: '40px' }}>
            <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                {t('analysisPage.title')}
            </Typography>
            <Typography variant="body1">{t('analysisPage.summary')}</Typography>

            <Grid container>
                <Grid item md={6}>
                    <ChartOne />
                </Grid>
                <Grid item md={6}>
                    <ChartFour />
                </Grid>
                <Grid item md={6}>
                    <ChartTwo />
                </Grid>
                <Grid item md={6}>
                    <ChartThree />
                </Grid>
                <Grid item xs={12}>
                    <CategoryAnalysis />
                </Grid>
            </Grid>
        </Stack>
    )
}
export default Analysis
