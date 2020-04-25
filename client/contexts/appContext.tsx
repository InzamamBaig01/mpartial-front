import * as React from "react";
import {
  getBoardData,
  updateBoardData,
  getServerTime
} from "../utils/api-routes/api-routes.util";
import { useState, useEffect } from "react";
import * as jsoncompare from "js-object-compare";
import history from "../utils/history";
import { useParams } from "react-router-dom";
import moment from 'moment';
interface IContextProps {
  dashboard: boolean;
  dispatchGetBoardDetails: Function;
  boards: any;
  dispatchUpdateBoardDetails: Function;
  onBoardDataChange: Function;
  boardEventBus: any;
  setBoardEventBus: Function;
  addBoardLane: Function;
  renameBoardLane: Function;
  currentBoard: any;
  selectBoard: Function;
  currentBoardId: number | undefined;
  setCurrentBoardId: Function;
  setCurrentCardId: Function;
  currentCardId: any;
  addCartToLane: Function;
  isShowBoardLink: boolean;
  setIsShowBoardLink: Function;
  renameBoardName: Function;
  setDashboardSidebarActive: Function;
  dashboardActive: Object;
  serverTime: any;
}

export const AppContext = React.createContext({} as IContextProps);

export default ({ children }) => {
  const dashboard = false;
  const [currentBoardId, setCurrentBoardId] = useState(undefined);
  const [currentCardId, setCurrentCardId] = useState(undefined);
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({
    lanes: []
  });
  const [currentCard, setCurrentCard] = useState({});
  const [isShowBoardLink, setIsShowBoardLink] = useState(true);

  const [boardEventBus, setBoardEventBusData] = useState(undefined);

  const [dashboardActive, setDashboardActive] = useState({
    boards: true,
    signup: false
  });

  const [serverTime, setServerTime] = useState(moment().utc());

  useEffect(() => {
    if (currentBoardId === undefined && boards.length) {
      // history.push(`/boarddetails/${boards[0].id}`);
      //
    }
  }, [boards]);

  useEffect(() => {

    // getServerTime().subscribe(
    //   (response: any) => {
    //     if (response.response.Requested_Action) {
    //     //  setServerTime(moment.utc(response.response.Message));
    //     setServerTime(moment(Number(response.response.Message)).utc());
    //     } else {
    //       //console.log(response);
    //     }
    //     // //console.log(response);
    //   },
    //   response => {
    //     //console.log(response);
    //   }
    // );
  }, [])

  // useEffect(() => {
  //   if(currentCardId !== undefined && boards.length){
  //     setCurrentCard()
  //   }
  // });


  useEffect(() => {
    if (currentBoardId && boards.length) {
      setCurrentBoard(getSelectedBoard(currentBoardId));
    }
  }, [currentBoardId, boards]);

  const setBoardEventBus = handle => {
    setBoardEventBusData(handle);
  };

  const selectBoard = board => {
    setCurrentBoard(board);
  };

  const getSelectedBoard = id => {
    const filteredBoard = boards.filter(board => {
      return board.id == id;
    });
    return filteredBoard.length
      ? filteredBoard[0]
      : {
        lanes: []
      };
  };

  const setDashboardSidebarActive = key => {
    setDashboardActive({
      boards: key === "boards" ? true : false,
      signup: key === "signup" ? true : false
    });
  };

  const formatBoards = data => {
    const boardsData = data.map(d => {
      dispatchUpdateBoardDetails({
        newBoardData: JSON.stringify(d),
        oldBoardData: JSON.stringify(d),
      }, d.id);
      // console.log(d);

      d.orignaldata = JSON.stringify(d);
      // d.data = d.data;
      d.lanes = d.lanes.map(l => {
        // l.cards = l.card ? l.cards : [];
        l.cards = l.cards
          ? l.cards.map(card => {
            card.draggable = true;
            return card;
          })
          : [];
        return l;
      });
      // const rd = {};
      // rd[d.name] = d.data;
      // TODO: fix this
      return d;
    });

    return boardsData;
  };

  const addBoardLane = (data: any) => {
    const laneData = currentBoard.lanes;
    laneData.push({
      id: "lane1" + Math.random(),
      title: data.title,
      label: ""
    });
    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData
    });
  };

  const renameBoardLane = (data: any) => {
    let laneData = currentBoard.lanes;
    laneData = laneData.map(lane => {
      if (lane.id === data.id) {
        lane.title = data.title;
      }
      return lane;
    });
    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData
    });
  };

  const renameBoardName = (data: any) => {
    currentBoard.name = data.name;
    const boardData = Object.assign({}, currentBoard);
    delete boardData.orignaldata;

    dispatchUpdateBoardDetails({
      newBoardData: JSON.stringify(boardData),
      oldBoardData: currentBoard.orignaldata
    }, currentBoard.id);
  };

  const addCartToLane = (data: any) => {
    let laneData = currentBoard.lanes;
    laneData = laneData.map(lane => {
      if (lane.id === data.id) {
        lane.cards.push({
          id: "Card" + Math.random(),
          title: data.title,
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" },
          laneId: data.id
        });
      }
      return lane;
    });
    boardEventBus.publish({
      type: "UPDATE_LANES",
      lanes: laneData
    });
  };


  const getBoardbyid = (data, id) => {
    const filteredBoard = data.filter(board => {
      return board.id == id;
    });
    return filteredBoard.length
      ? filteredBoard[0]
      : false;
  }

  const onBoardDataChange = newData => {
    if (JSON.stringify(newData) !== currentBoard.orignaldata) {
      newData.lanes = newData.lanes.map((lane, i) => {
        if (lane.cards === undefined) {
          lane.cards = [];
        } else {
          // lane.cards = lane.cards.map((card) => {
          //   card.draggable = true;
          //   return card;
          // })
        }
        return lane;
      });

      const boardData = Object.assign({}, currentBoard);
      delete boardData.orignaldata;


      boardData.lanes = newData.lanes;


      getBoardData({}).subscribe(
        (response: any) => {
          if (response.response.Requested_Action) {
            const board = getBoardbyid(response.response.data, currentBoard.id);
            if (board) {
              dispatchUpdateBoardDetails({
                newBoardData: JSON.stringify(boardData),
                oldBoardData: JSON.stringify(board)
              }, currentBoard.id);
            }
          } else {
            //console.log(response);
          }
          // //console.log(response);
        },
        response => {
          //console.log(response);
        }
      );
    }
  };

  const dispatchGetBoardDetails = () => {
    getBoardData({}).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          setBoards(formatBoards(response.response.data));
        } else {
          //console.log(response);
        }
        // //console.log(response);
      },
      response => {
        //console.log(response);
      }
    );
  };


  const dispatchUpdateBoardDetails = (payload, id) => {
    updateBoardData(payload, id).subscribe(
      (response: any) => {
        if (response.response.Requested_Action) {
          dispatchGetBoardDetails();
        } else {
          // console.log(response);
        }
        // //console.log(response);
      },
      response => {
        //console.log(response);
      }
    );
  };

  const defaultContext = {
    dashboard,
    dispatchGetBoardDetails,
    boards,
    dispatchUpdateBoardDetails,
    onBoardDataChange,
    boardEventBus,
    setBoardEventBus,
    addBoardLane,
    currentBoard,
    selectBoard,
    currentBoardId,
    setCurrentBoardId,
    renameBoardLane,
    addCartToLane,
    setIsShowBoardLink,
    isShowBoardLink,
    renameBoardName,
    dashboardActive,
    setDashboardSidebarActive,
    setCurrentCardId,
    currentCardId,
    serverTime,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
