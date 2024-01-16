import {ItemWrapper, StyledContactListContainer, StyledHeaderCntainer} from "./Styles.js";
import ContactList from "../../components/ContactList/index";
import MessageArea from "../../components/MessageArea/index";
import useSocket from '../../hooks/useSocket'
import React from "react";
import {SocketContext} from "../../utils/utils";
import {Header} from "antd/es/layout/layout";
import HeaderComponent from "../../components/Header/index";

export default function HomePage(){

    const {socket,sendMessage,sendConnectionRequestNotifs } = useSocket();


    return (
        <SocketContext.Provider value={ {socket,sendMessage,sendConnectionRequestNotifs }}>
            <StyledHeaderCntainer>
                <HeaderComponent/>
            </StyledHeaderCntainer>
            <ItemWrapper>
                <StyledContactListContainer>
                    <ContactList/>
                </StyledContactListContainer>
                <MessageArea/>
            </ItemWrapper>
        </SocketContext.Provider>

    )
}