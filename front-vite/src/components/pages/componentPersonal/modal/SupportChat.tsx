import { useState, useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import {
  Search,
  EllipsisVertical,
  SendHorizontal,
  Paperclip,
  Smile,
  X,
  Check,
  CheckCheck,
} from 'lucide-react';
import '../style/supportChat.css';
import { RootState } from '../../../../utils/interface';
import { useSelector } from 'react-redux';
import { connectSocket, disconnectSocket, markMessagesAsRead, emitMessage } from '../../../../utils/socket';
import { Message } from '../mainPanel/interface';
import type { Request } from '../interface/requests';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectUser?: number;
  isManager?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || '';

const SupportChat = ({ isOpen, onClose, selectUser, isManager }: IModalProps) => {
  const user = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [supportRequestId, setSupportRequestId] = useState<number | null>(null);
  const [request, setRequest] = useState<Request | null>(null);

  const [userNames, setUserNames] = useState<Record<number, string | null>>({});

  useEffect(() => {
    if (isOpen) {
      let queryParams = isManager && selectUser
        ? `user=${selectUser}&isActive=true`
        : `user=${user.user?.id}&isActive=true`;

      fetch(`${API_URL}/support-requests/?${queryParams}`, {
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json()).then(data => {
        if (data.length > 0) {
          setSupportRequestId(data[0].id);
          setRequest(data[0]);

          fetch(`${API_URL}/support-requests/${data[0].id}/messages`, {
            method: 'GET',
            credentials: 'include'
          }).then(resp => resp.json()).then(msgs => {
            setMessages(msgs.sort((a: { sentAt: string; }, b: { sentAt: any; }) => a.sentAt.localeCompare(b.sentAt)));
          }).catch(error => {
            console.error('Ошибка при получении сообщений:', error);
          });
        } else {
          if (!isManager) {
            fetch(`${API_URL}/support-requests`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: user.user?.id,
                isActive: true
              })
            }).then(response => response.json()).then(data => {
              setSupportRequestId(data.id);
              setRequest(data);
              setMessages([]);
            }).catch(error => {
              console.error('Ошибка при создании обращения:', error);
            });
          } else {
            setSupportRequestId(null);
            setRequest(null);
            setMessages([]);
          }
        }
      }).catch(error => {
        console.error('Ошибка при получении обращений:', error);
      });
    } else {
      disconnectSocket();
    }
  }, [isOpen, user, selectUser, isManager]);

  useEffect(() => {
    if (isOpen && supportRequestId) {
      connectSocket(supportRequestId, {
        onConnect: () => {
          console.log('Подключились к серверу WebSocket.');
        },
        onNewMessage: (newMessage: Message) => {
          setMessages(prevMsgs =>  prevMsgs.concat(newMessage));
        },
        onMarkedAsRead: () => {
          console.log('Сообщения отмечены прочитанными.');
        }
      });
      handleMarkMessagesAsRead();
    }
  }, [isOpen, supportRequestId]);

  const handleSendMessage = useCallback(() => {
    if (isOpen && currentMessage.trim() && supportRequestId) {
      emitMessage({
        author: user.user?.id,
        text: currentMessage,
        supportRequest: supportRequestId
      });
      setCurrentMessage('');
    }
    

  }, [isOpen, currentMessage, user, supportRequestId]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      const messagesBox = document.querySelector('.message-box');
      if (messagesBox) {
        messagesBox.scrollTo(0, messagesBox.scrollHeight);
      }

    }
  }, [isOpen, messages]);

  const fetchUserName = useCallback(async (userId: number) => {
    if (!userNames[userId]) {
      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
          method: 'GET',
          credentials: 'include'
        });
        const userData = await response.json();
        setUserNames(prevUserNames => ({
          ...prevUserNames,
          [userId]: userData.name
        }));
      } catch (error) {
        console.error('Ошибка при получении имени пользователя:', error);
      }
    }
  }, [userNames]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      const uniqueUserIds = [...new Set(messages.map((msg) => msg.author))];
      uniqueUserIds.forEach((userId) => {
        if (!userNames[userId]) {
          fetchUserName(userId);
        }
      });
    }
  }, [isOpen, messages, userNames, fetchUserName]);

  const handleMarkMessagesAsRead = useCallback(() => {
    if (supportRequestId && isOpen && user.user?.id) {
      const now = new Date();
      markMessagesAsRead({
        user: user.user.id,
        supportRequest: supportRequestId,
        createdBefore: now
      });
    }
  }, [supportRequestId, user, isOpen]);

  const closeModalAndDisconnect = () => {
    disconnectSocket();
    onClose();
  };

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModalAndDisconnect}
        shouldCloseOnOverlayClick={false}
        overlayClassName="modal-overlay"
        className="chat-container"
      >
        <div className="chat-box">
          <header className="header-chat">
            <a href="#">LOGO</a>
            <p>Техподдержка</p>
            <div className="flex">
              <p><Search /></p>
              <p><EllipsisVertical /></p>
            </div>
          </header>

          <div className="message-box">
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-item ${
                    msg.author === user.user?.id ? "right" : "left"
                  }`}
                >
                  <p className={`author-type ${
                    msg.author === user.user?.id ? "right-type" : "left-type"
                  }`}>{userNames[msg.author]}</p>
                  <p>{msg.text}</p>
                  <p className="right">
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {msg.readAt ? <CheckCheck /> : <Check />}
                  </p>
                </div>
              ))
            ) : (
              <p>Нет сообщений.</p>
            )}
          </div>
          <div className="input-message">
            <button type="button"><Paperclip /></button>
            <input
              className="message"
              placeholder="Сообщение..."
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button type="button"><Smile /></button>
            <button type="button" onClick={handleSendMessage}>
              <SendHorizontal />
            </button>
          </div>
        </div>
        <button className="button-one chat" onClick={closeModalAndDisconnect}><X /></button>
      </ReactModal>
    </>
  );
};

export default SupportChat;