import { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function ProtectedRoutes({Component,props}:any) {
    const appContext:any = useContext(AppContext);
    console.log("I Am appContext",appContext?.state?.isLoggedIn)
    if(appContext?.state?.isLoggedIn || true) return <Component/>;
    else return <p>NOT LOGGED IN</p>
  
}
