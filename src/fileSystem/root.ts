import os from 'os';

// you can get Desktop path below both Win and Mac.
export const DESKTOPPATH:string = path.join(os.homedir(), 'Desktop');

//file protocol. you need this for using on older than Photoshop 24.4 
const PROTOCOL = 'file:';

export const setProtocol:(filePath:string)=>string = filePath => HASPROTOCOL ? path.join(PROTOCOL,filePath) : filePath ;
