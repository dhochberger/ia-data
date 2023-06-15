import { Box } from '@mui/material'
import { FunctionComponent } from 'react'
import { TailSpin } from 'react-loader-spinner'
import styles from 'src/assets/styles'

const theme = styles.theme

interface Props {
    value: boolean
}

const LoadingSpinner: FunctionComponent<Props> = ({ value }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                visibility: value ? 'visible' : 'hidden',
                backgroundColor: 'rgb(0,0,0,0.3)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    placeContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TailSpin ariaLabel="loading-indicator" visible={value} color={theme.palette.primary.main} />
            </div>
        </Box>
    )
}

export default LoadingSpinner
