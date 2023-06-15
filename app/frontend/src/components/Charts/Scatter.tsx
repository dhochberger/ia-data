import { Paper } from '@mui/material'
import { Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, ScatterDataPoint, Tooltip } from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Scatter } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface Props {
    data: any
    options?: any
}
const ScatterRecommender: FunctionComponent<Props> = ({ data, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'scatter', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Scatter options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default ScatterRecommender
