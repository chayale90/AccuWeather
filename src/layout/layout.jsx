
import { Outlet } from 'react-router-dom'
import Header from './header/header'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { theme } from '../services/theme'

export default function Layout() {

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.featuresSlice);
    const mode = useMemo(() => {
        if (darkMode)
            return theme.palette.darkMode.main
        return theme.palette.success.main
    }, [darkMode]);


    return (
        <div style={{ backgroundColor: mode }}>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}
