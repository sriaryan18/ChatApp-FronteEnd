import { Content, Header } from 'antd/es/layout/layout';
import MessageArea from '../components/MessageArea';
import {useContext, useEffect, useRef, useState} from 'react';
import { listenFrindRequests, listenMessages, listenTyping } from '../Sockets/ListenRequests';
import { sendConnectionRequestNotifs, sendMessage } from '../Sockets/SendMessages';
import ContactList from '../components/ContactList';
import { Input, Layout, message } from 'antd';
import ModalComp from '../components/Modal';
import { CheckUserNameAvailable } from '../utils/handleSignUp';
import Sider from 'antd/es/layout/Sider';
import HeaderComponent from '../components/HeaderComponent';
import { GetConnections, GetNotifications } from '../utils/connections';
import { constants } from '../utils/Constants';
import { GetMessagesFromChatId } from '../utils/Messages';
import {useNavigate} from "react-router-dom";
import {getUserCreds, userCreds} from '../utils/utils.ts'
import {AppContext} from "../AppContext.tsx";

export default function Homepage() {
  const navigate = useNavigate();
  const appContext: any = useContext(AppContext);
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [connections, setConnections]: any = useState(null)
  const [activeUserChatId, setActiveUserChatId] = useState('khattu');
  const [messagesOfActiveChat, setMessagesOfActiveChat] = useState<Array<any>>([]) // should be a derived state
  const [activeUserName, setActiveUserName] = useState('khattu')
  const [showSendConnectionRequestModal, setShowSendConnectionRequestModal] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState("")
  let creds: userCreds | null = null;
  const socketRef = useRef(appContext.getSocket());
  const socket = socketRef.current;
  try {
    creds = getUserCreds();
  } catch (err) {
    navigate('/')
  }

  function updateConnection(data: object) {
    console.log("I am connection", connections);
    if (!connections) return;
    const con = connections.map((item: any) => {
      if (item.username === data?.["from" as keyof object]) {
        item['unseenCount'] = item['unseenCount'] ? item['unseenCount'] + 1 : 1
      }
      return item;
    })
    setConnections([...con]);
  }
  const {username, token}: any = creds;
  const addToNotifaication = (data: any) => {

    setNotifications((prevState: any) => {
      return [...prevState, data]
    });
  }

  const deleteNotification = (originatedFromUsername: string, type: string) => {
    let notifArr = [...notifications];
    for (let i = 0; i < notifArr.length; i++) {
      if (notifArr[i].originatedFromUsername === originatedFromUsername && notifArr[i].type === type) {
        notifArr.splice(i, 1);
        break;
      }
    }
    setNotifications((p) => {
      return [...notifArr]
    });
    console.log(notifArr);
  }
  useEffect(() => {
    console.log(connections)
  }, [connections]);

  useEffect(() => {
    (async ()=>{async function fetchConnections() {
      if (!connections) {
        const response: any = await GetConnections(username, token);
        if (response.status == 200) {
          setConnections(response.data);
        }
      }
    }

    async function getNotifications() {
      const notifs = await GetNotifications(token, username, 0);
      if (notifs.status === 200) {
        setNotifications(() => [...notifs?.["data" as keyof object]]);
      }
    }
      await getNotifications();
      await  fetchConnections();

    })()

    if (socket) {
      console.log("use effect at homepage")
      listenFrindRequests(socket, addToNotifaication);
      listenTyping(socket, () => {
      });
      listenMessages(socket, updateConnection);

    }
    return () => {

      if (socket) {
        socket.off("friendRequest");
        socket.off("typing-personal");
        socket.off('message-personal');
      }
    }

  }, []);


  const handleSendRequest = async () => {
    if (searchedUsername) {
      const res = await CheckUserNameAvailable(searchedUsername);  // if the username is valid then only I will send the request
      if (res == true) {
        message.error("No Username available");
        setSearchedUsername("");
        return;
      } else {
        sendConnectionRequestNotifs(socket, {
          destinatedUsername: searchedUsername,
          originatedFromUsername: username,
          type: constants.REQUEST_TYPE
        });
      }
    }
    setSearchedUsername("");
    setShowSendConnectionRequestModal(false);

  }

  const handleUsernameChange = async (val: any) => {
    setSearchedUsername(val.target.value);
  }

  const sendMessageToUser = (msg: any) => {
    console.log("I am message", msg);
    let messageToSend = {
      to: activeUserName, // this will be fetched from a useState
      message: msg,
      from: username,
      chatId: activeUserChatId
    }
    sendMessage(socket, messageToSend);
  }

  const fetchMessages = async (chatID: string) => {
    const messagesOfChat: any = await GetMessagesFromChatId(chatID, token);
    if (messagesOfChat.status === 200) {
      setMessagesOfActiveChat(messagesOfChat.data);
    } else {
      message.error("Error fetching chats ");
    }
  }


  return (
      <Layout style={{display: 'flex', flex: 1, height: '94vh', marginRight: 30, marginLeft: 30, margin: 30}}>
        <Header style={{display: 'flex', background: 'gray'}}>
          <HeaderComponent
              username={username}
              notifications={notifications}
              deleteNotification={deleteNotification}
          />
        </Header>
        <Content style={{background: 'green', flex: 1, display: 'flex'}}>
          <Layout>
            <Sider style={{background: '#e1e6e2', display: 'flex', flexDirection: 'column', border: "2px solid white",}}
                   width={"25%"}>
              <ContactList
                  setCurrentActiveUserChatId={setActiveUserChatId}
                  showRequestModal={setShowSendConnectionRequestModal}
                  setActiveUserName={setActiveUserName}
                  connections={connections}
                  fetchMessages={fetchMessages}
                  setConnections={setConnections}
              />

            </Sider>
            <Content style={{background: "#e1e6e2"}}>
              <MessageArea sendMessage={sendMessageToUser} messages={messagesOfActiveChat}
                           setMessagesOfActiveChat={setMessagesOfActiveChat}/>
              <ModalComp open={showSendConnectionRequestModal}
                         onCancel={() => setShowSendConnectionRequestModal(false)}
                         onOk={handleSendRequest}
              >
                <h2>Username</h2>
                <Input
                    value={searchedUsername}
                    onChange={handleUsernameChange}
                    onPressEnter={handleSendRequest}
                    allowClear
                    style={{width: '80%'}}
                    placeholder='Username'
                />
              </ModalComp>
            </Content>
          </Layout>
        </Content>
      </Layout>

  );
}

