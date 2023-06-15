import { Card, CardContent, Stack, Typography } from '@mui/material'
import { FunctionComponent } from 'react'

interface Props {
    value: number | string
    label: string
    isPositive?: boolean
}

const CardNumber: FunctionComponent<Props> = ({ value, label, isPositive }) => (
    <Card sx={{ borderRadius: '8px', border: theme => `solid 2px ${theme.palette.secondary.main}` }}>
        <CardContent>
            <Stack direction="column">
                <Typography variant="subtitle2">{label}</Typography>
                <Typography variant="body1">{value}</Typography>
            </Stack>
        </CardContent>
    </Card>
)

export default CardNumber
