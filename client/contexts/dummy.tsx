import { action, observable } from 'mobx';
import SockJS from 'sockjs-client';
import { WEBSOCKETURL } from '../const_settings';
import * as STOMP from 'stompjs';
import { store } from '.';
import { message } from 'antd';
export class SocketStore {
@observable
sockJs: any = '';
@observable
stompClient: any = '';
@observable
socketConnectedStatus: boolean = false;
@action
buildSocketConnection = () => {
if (this.stompClient.connected) {
if (this.stompClient.connected) {
this.changeConnectionStatus(true);
} else if (!this.stompClient.connected) {
this.changeConnectionStatus(false);
}
} else {
this.sockJs = new SockJS(`${WEBSOCKETURL.websocketBaseUrl}`);
this.stompClient = STOMP.over(this.sockJs);
this.stompClient.debug=null;
this.stompClient.connect(
{
//Headers
},
(frame: any) => {
this.stompClient.subscribe(
'/topic/publicChatRoom',
(payload: any) => {
this.changeConnectionStatus(true);
const data = JSON.parse(payload.body);
if (data['updateType'] === 'refreshTable') {
store.updateStoreData!.updateDataType(data);
} else if (data['updateType'] === 'thinClientsTable') {
store.updateStoreData!.updateDataType(data);
}
else if (data['updateType'] === 'imageInventoryTable') {
store.updateStoreData!.updateDataType(data);
}
else if (data['updateType'] === 'refreshPage') {
store.user.logout();
window.location.reload(true);
}
else if (data['updateType'] === 'allEndPoints') {
store.updateStoreData!.updateDataType(data);
}
else if (data['updateType'] === 'applicationShortcutTable') {
store.updateStoreData!.updateDataType(data);
}
else if (data['updateType'] === 'serviceTable') {
store.updateStoreData!.updateDataType(data);
}
else if (data['updateType'] === 'notificationTable') {
store.updateStoreData!.updateDataType(data);
store.navbar.incrementBadgeCounter();
}
else if (data['updateType'] === 'logOut') {
store.user.logout();
message.error(data['changeOn']);
}
else if (data['updateType'] === 'highlightTable') {
store.updateStoreData!.updateDataType(data);
} else if (data['updateType'] === 'clearTable') {
store.navbar.resetBadgeCounter();
// store.updateStoreData!.updateDataType(data);
} else if (data['updateType'] === 'exportFileUpdate') {
store.updateStoreData!.updateDataType(data);
}
else if (data['updateType'] === 'pendingTaskTable') {
store.updateStoreData!.updateDataType(data);
}else {
const {
updateOnlineEndPointsData,
updateDeviceAlertStatusData,
updatePendingScheduleData,
updateUpdatedEndPointsData,
updateDiskUsageData,
updateCPUUsageData,
updateNetworkUsageData,
updateReceivePollsData,
updateRunningTaskData,
updateRunningTaskTableData,
updateOSTypeData,
updateOsTypeStatusReceiveByServerData,
incrementSocketRequestCounter,
updateRunningTaskTableDataToDefault,
} = store.dashboard!;
if (data !== undefined) {
incrementSocketRequestCounter();
}
//Added, Online, Offline Charts
if (data.deviceAlertStatus !== undefined) {
if (data.deviceAlertStatus.length > 0) {
updateDeviceAlertStatusData(data.deviceAlertStatus);
updateOnlineEndPointsData(data.deviceAlertStatus);
}
} else {
//show Loader
}
//Pending Schedule Charts
if (
data.pendingSchedule !== undefined &&
data.totalSchedule !== undefined
) {
updatePendingScheduleData(
data.pendingSchedule,
data.totalSchedule,
);
} else {
//show Loader
}
//Updated End Point Charts
if (
data.totalMachines !== undefined &&
data.pendingImages !== undefined
) {
updateUpdatedEndPointsData(
data.totalMachines,
data.pendingImages,
data.totalMachines,
);
} else {
//show Loader
}
//Update Disk Usage Data
if (
data.serverStats !== undefined &&
data.serverStats !== null
) {
updateDiskUsageData(data.serverStats);
updateCPUUsageData(data.serverStats);
updateNetworkUsageData(data.serverStats);
updateRunningTaskData(data.serverStats);
updateOsTypeStatusReceiveByServerData(data.serverStats);
}
if (
data.pollsReceived !== undefined &&
data.pollsReceived !== null
) {
updateReceivePollsData(data);
}
if (
data.runninTasksRows !== undefined &&
data.tableHeader !== undefined
) {
if (
data.runninTasksRows.length > 0 &&
data.tableHeader.length > 0
) {
updateRunningTaskTableData(data);
} else {
updateRunningTaskTableDataToDefault(data);
}
}
if (
data.linuxMachineCount !== undefined &&
data.totalMachines !== null
) {
updateOSTypeData(data);
}
}
},
(err: any) => {
},
);
},
(err: any) => {
},
);
}
};
@action
changeConnectionStatus = (status: boolean) => {
this.socketConnectedStatus = status;
};
@action
disconnectSocketConnection = () => {
if (this.stompClient!.connected) {
this.stompClient.unsubscribe('/topic/publicChatRoom', () => {});
this.stompClient.disconnect(() => {
// console.log('%c Disconnet ', 'background:#E12800; color:#E3E3E3');
}, {});
} else {
// console.log('%c NOT CONNECTED ', 'background:#E12800; color:#E3E3E3');
}
};
@action
resetSocketToDefault = () => {
this.sockJs = '';
this.stompClient = '';
};
}