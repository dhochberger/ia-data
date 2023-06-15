import { Box, Stack, Tooltip } from '@mui/material'
import { FunctionComponent } from 'react'
import { PredictedColors } from 'src/types/Color'

interface Props {
    predictionColors: PredictedColors
}

const BoxColor: FunctionComponent<Props> = ({ predictionColors }) => (
    <Stack
        direction="row"
        width="100%"
        sx={{
            border: theme => (predictionColors.colors.length ? `1px solid ${theme.palette.common.black}` : ''),
            borderRadius: 1,
        }}
    >
        {predictionColors.colors.map(item => (
            <Tooltip
                sx={{ height: '80px', width: `${item.percent}px` }}
                title={`${item.color} | ${item.name} : ${item.value} | ${item.percent}`}
            >
                <Box sx={{ height: '80px', width: `${item.percent}%`, backgroundColor: item.color }} />
            </Tooltip>
        ))}
    </Stack>
)

export default BoxColor
