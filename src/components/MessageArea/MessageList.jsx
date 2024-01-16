import {List} from "antd";
import React, {useEffect} from "react";
import {scrollToBottom} from "./helper.js";

export default function MessageList({username,messages}){

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div style={{flexDirection: 'column', flex: 1,}}>
            <List
                dataSource={messages}
                itemLayout="horizontal"
                className="messagesArea"
                renderItem={(item) => {
                    const orient = item.sender === username;
                    return (
                        <List.Item.Meta
                            title={
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: orient ? 'flex-end' : 'flex-start'
                                }}>
                                    <div style={{
                                        backgroundColor: orient ? "#76b586" : "white",
                                        display: 'flex',
                                        justifyContent: orient ? 'flex-end' : 'flex-start',
                                        borderRadius: 10,
                                        margin: 15
                                    }}>
                                        <h2 style={{margin: 15}}>{item?.title || ""} </h2>
                                    </div>

                                </div>
                            }

                        />
                    );
                }}
            />

        </div>
    )
}