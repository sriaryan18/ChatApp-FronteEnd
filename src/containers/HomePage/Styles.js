import styled from "styled-components";


export const ItemWrapper = styled.div`
    display: flex;
    height: 98vh;
    flex:1;
    background-color: ghostwhite;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    padding: 5px;
    flex-direction: row;
`
export const StyledContactListContainer = styled.div`
    display: flex;
    flex: 0.2;
    background: antiquewhite;
    border-radius: 8px;
    overflow-y: auto;
    padding: 2px;
    border-right:2px solid black;
    .contactList{
        flex:1;
        padding: 5px;
    }
   
`

