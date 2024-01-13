
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function getIsLoggedIn(state:any){
    return state.username && state.authToken;
}

export default function ProtectedRoutes({Component}:any) {

    const isUserLoggedIn = useSelector(state => getIsLoggedIn(state));
    const navigate = useNavigate();
    if(isUserLoggedIn){
        return <Component/>
    }else navigate('/');
  
}
