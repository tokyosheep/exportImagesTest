import os from 'os';

export const DESKTOPPATH:string = path.join(os.homedir(), 'Desktop');

//file protocol. you need this. using on older version than Photoshop 24.4 
const PROTOCOL = 'file:';

export const setProtocol:(filePath:string)=>string = filePath => HASPROTOCOL ? path.join(PROTOCOL,filePath) : filePath ;
