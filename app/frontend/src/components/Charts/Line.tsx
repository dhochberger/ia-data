import { Paper } from '@mui/material'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    ScatterDataPoint,
    Title,
    Tooltip,
} from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
    data: any
    options?: any
}
const LineRecommender: FunctionComponent<Props> = ({ data, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'line', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Line options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default LineRecommender
