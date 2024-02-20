import {ItemWrapper, StyledContactListContainer, StyledHeaderCntainer} from "./Styles.js";
import ContactList from "../../components/ContactList/index";
import MessageArea from "../../components/MessageArea/index";
import useSocket from '../../hooks/useSocket'
import React from "react";
import {SocketContext} from "../../utils/utils";
import HeaderComponent from "../../components/Header/index";

export default function HomePage(){

    const {socket,sendMessage,sendConnectionRequestNotifs,deleteFriendRequest } = useSocket();


    return (
        <SocketContext.Provider
            value={{
                socket,
                sendMessage,
                sendConnectionRequestNotifs,
                deleteFriendRequest
            }}
        >
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