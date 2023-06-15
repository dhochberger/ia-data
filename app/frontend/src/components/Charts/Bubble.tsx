import { Paper } from '@mui/material'
import { Chart as ChartJS, Legend, LinearScale, PointElement, ScatterDataPoint, Tooltip } from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Bubble } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

interface Props {
    data: any
    options?: any
}
const BubbleRecommender: FunctionComponent<Props> = ({ data, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'bubble', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Bubble options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default BubbleRecommender
