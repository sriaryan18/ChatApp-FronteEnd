import styled from "styled-components";
import MessageArea from "../../components/MessageArea/index";
import {Layout} from "antd";
import {Header} from "antd/es/layout/layout";


export const ItemWrapper = styled(Layout)`
    display: flex;
    height: 91vh;
    flex:1;
    background-color: ghostwhite;
    //border-radius: 8px;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    padding: 5px;
    flex-direction: row;
    .messageArea{
        background-color: floralwhite;
        flex:0.8;
        border-radius: 8px;
    }
`
export const StyledContactListContainer = styled.div`
    display: flex;
    flex: 0.2;
    background: antiquewhite;
    //border-radius: 8px;
    overflow-y: auto;
    padding: 2px;
    border-right:2px solid black;
    .contactList{
        flex:1;
        padding: 5px;
    }
   
`
export const StyledHeaderCntainer = styled(Header)`
    background-color: tan;
    display: flex;
    justify-content: center;
    
`
