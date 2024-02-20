export const preProcessMessages = (messages)=>{
    if(!messages) return;
    return  messages.map((item)=>{
        return {
            title:item.message,
            sender:item.sender
        }
    })
}

export const scrollToBottom = () => {
    const c =document.querySelector('.messagesArea');
    if (c) {
        c.scrollIntoView({block:'end', behavior: 'smooth', inline:'end' });
    }
};