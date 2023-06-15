import { Paper } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, ScatterDataPoint, Tooltip } from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

interface Props {
    data: any
    options?: any
}
const PolarAreaRecommender: FunctionComponent<Props> = ({ data, options }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'polarArea', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <PolarArea options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default PolarAreaRecommender
