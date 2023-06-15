import { Paper, Typography } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, ScatterDataPoint, Tooltip } from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
    data: any
    options?: any
    title?: string
}
const DoughnutRecommender: FunctionComponent<Props> = ({ data, options, title }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'doughnut', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card} sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', padding: '10px' }}>
                {title}
            </Typography>
            <Doughnut options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default DoughnutRecommender
