import * as React from 'react';
import {
  getBoardData,
  updateBoardData
} from '../utils/api-routes/api-routes.util';
import { useState } from 'react';
import * as jsoncompare from 'js-object-compare';
import history from '../utils/history';

import SockJS from 'sockjs-client';
import * as STOMP from 'stompjs';
import SockJsClient from 'react-stomp';


interface IContextProps {
  sockJs: any;
  stompClient: any;
  socketConnectedStatus: any;
  buildSocketConnection: Function;
  changeConnectionStatus: Function;
  disconnectSocketConnection: Function;
  resetSocketToDefault: Function;
}

export const SocketContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const [sockJs, setSockJs] = useState({});
  const [stompClient, setStompClient] = useState({connected: false});
  const WEBSOCKETURL = 'http://corevoyant.com:9000/ws';
  // let clientRef;
  // React.useEffect(() => {
  //   console.log(clientRef.connect())
  // }, [clientRef])

  // var sock = new SockJS('http://corevoyant.com:9000/ws');
  // sock.onopen = function() {
  //     console.log('open');
  //     sock.send('test');
  // };
 
  // sock.onmessage = function(e) {
  //     console.log('message', e.data);
  //     sock.close();
  // };
 
  // sock.onclose = function(e) {
  //     console.log(e,'close');
  // };



  const socketConnectedStatus: boolean = false;
  const buildSocketConnection = () => {
    if (stompClient.connected) {
      if (stompClient.connected) {
        changeConnectionStatus(true);
      } else if (!stompClient.connected) {
        changeConnectionStatus(false);
      }
    } else {
        const sockJss = new SockJS(`${WEBSOCKETURL}`);
        console.log(sockJss);
      const stompClients = STOMP.over(sockJss);
      setStompClient({
        ...stompClient,
        debug: null
      });

      stompClients.connect(
        {
          // Headers
        },
        (frame: any) => {
            stompClients.subscribe(
            '/topic/publicChatRoom',
            (payload: any) => {
              changeConnectionStatus(true);
              const data = JSON.parse(payload.body);
              console.log(data);
            },
            (err: any) => {}
          );
        },
        (err: any) => {}
      );
    }
  };


  React.useEffect(() => {
    // buildSocketConnection();
    // console.log('%c Disconnet ', 'background:#E12800; color:#E3E3E3');
  }, [])
  const changeConnectionStatus = (status: boolean) => {
    socketConnectedStatus = status;
  };
  const disconnectSocketConnection = () => {
    if (stompClient!.connected) {
      stompClient.unsubscribe('/topic/publicChatRoom', () => {});
      stompClient.disconnect(() => {
        // console.log('%c Disconnet ', 'background:#E12800; color:#E3E3E3');
      }, {});
    } else {
      // console.log('%c NOT CONNECTED ', 'background:#E12800; color:#E3E3E3');
    }
  };
  const resetSocketToDefault = () => {
    // sockJs = "";
    // stompClient = "";
  };

  const defaultContext = {
    sockJs,
    stompClient,
    socketConnectedStatus,
    buildSocketConnection,
    changeConnectionStatus,
    disconnectSocketConnection,
    resetSocketToDefault,
  };

  return (
    <SocketContext.Provider value={defaultContext}>
       {/* <SockJsClient url={WEBSOCKETURL}   topics={["/topic/all"]}
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { clientRef = client }} /> */}
      {children}
    </SocketContext.Provider>
  );
};
