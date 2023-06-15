import { Grid, StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Analysis, Library, Predict, Moviedetails } from 'src/pages'
import store from 'src/redux/store'
import App from './App'
import styles from './assets/styles'
import { Drawer } from './components'
import i18n from './config/i18n'

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={styles.theme}>
                <Provider store={store}>
                    <Router>
                        <Grid container spacing={1} sx={{ backgroundColor: theme => theme.palette.secondary.light }}>
                            <Grid item xs={2} sx={{ backgroundColor: theme => theme.palette.primary.main }}>
                                <Drawer />
                            </Grid>
                            <Grid item xs={10}>
                                <Routes>
                                    {/*indexRoutes.map(({ path, component, exact, type }, key) => (
                                        <AuthRoute path={path} exact={exact} component={component} key={key} type={type} />
                                    ))*/}
                                    <Route path="/" element={<App />} />
                                    <Route path="/analysis" element={<Analysis />} />
                                    <Route path="/library" element={<Library />} />
                                    <Route path="/predict" element={<Predict />} />
                                    <Route path="/moviedetails" element={<Moviedetails />} />
                                </Routes>
                            </Grid>
                        </Grid>
                    </Router>
                </Provider>
                ,
            </ThemeProvider>
        </StyledEngineProvider>
    </I18nextProvider>,
    document.getElementById('root')
)
