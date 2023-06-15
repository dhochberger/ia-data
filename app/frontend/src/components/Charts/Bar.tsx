import { Paper, Stack, TextField, Typography } from '@mui/material'
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    ScatterDataPoint,
    Title,
    Tooltip,
} from 'chart.js'
import { FunctionComponent, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types'
import { useLayoutsStyles } from 'src/assets'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
    data: any
    options?: any
    title: string
    showSelection?: boolean
    max?: number
    setNumber?: (value: number) => void
}
const BarRecommender: FunctionComponent<Props> = ({ data, options, title, showSelection, max, setNumber }) => {
    const styles = useLayoutsStyles()

    const ref: React.MutableRefObject<ChartJSOrUndefined<'bar', (number | ScatterDataPoint | null)[], unknown>> =
        useRef()

    useEffect(() => {
        ref.current?.update()
    }, [data])

    return (
        <Paper className={styles.card}>
            <Stack direction="row">
                <Typography variant="h6" sx={{ textAlign: 'center', padding: '10px' }}>
                    {title}
                </Typography>
                {showSelection && (
                    <TextField
                        sx={{ width: '40%' }}
                        type="number"
                        onBlur={e => setNumber?.(parseInt(e.target.value))}
                        InputProps={{ inputProps: { min: 0, max: max } }}
                        placeholder={`Max : ${max}`}
                    />
                )}
            </Stack>
            <Bar options={options} data={data} ref={ref} />
        </Paper>
    )
}
export default BarRecommender
