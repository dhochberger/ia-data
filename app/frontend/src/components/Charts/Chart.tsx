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
import { Chart } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
    data: any
    type?: any
    options?: any
}
const ChartRecommender: FunctionComponent<Props> = ({ data, type, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'bar', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Chart type={type} options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default ChartRecommender
