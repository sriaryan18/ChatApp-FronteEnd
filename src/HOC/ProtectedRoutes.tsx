
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../utils/utils.ts";



export default function ProtectedRoutes({Component}:any) {

    const isUserLoggedIn = useSelector(state => getIsLoggedIn(state.auth));
    if(isUserLoggedIn){
        return <Component/>
    }else {
       window.location.href = window.location.origin  // TODO : handle this with react-router-dom
    };
  
}
