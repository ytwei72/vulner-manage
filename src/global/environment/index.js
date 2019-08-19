

const PROTOCOL = 'http';
// const BASE_URL = '://192.168.87.128:8090/'; // TQ 虚拟机
// const BASE_URL = '://192.168.207.138:8090/'; // WYT 虚拟机
const BASE_URL = '://localhost:10091'; // 本地
// const BASE_URL = '://172.16.60.5:8090/'; // 信通所云服务器

export function GetBackEndRootUrl() {
    return PROTOCOL + BASE_URL;
}

export function GetWebSocketUrl() {
    return 'ws' + BASE_URL + 'websocket/';
}

export function IsSimulateMode() {
    // return true;
    return false;
}

export function GetViewMinWidth() {
    return 1100;
}
