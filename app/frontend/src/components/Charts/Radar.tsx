import { Paper } from '@mui/material'
import {
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    PointElement,
    RadialLinearScale,
    ScatterDataPoint,
    Tooltip,
} from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Radar } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface Props {
    data: any
    options?: any
}
const RadarRecommender: FunctionComponent<Props> = ({ data, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'radar', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Radar options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default RadarRecommender
