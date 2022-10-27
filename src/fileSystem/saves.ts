import { app } from 'photoshop';
import * as fs from 'fs';
import * as uxp from 'uxp';
import * as os from 'os';
import * as path from 'path-browserify';

const uxpfs = uxp.storage.localFileSystem;

export const setFileProtocol = filePath => `file:${filePath}`;
export const desktopPath = `file:${os.homedir()}/Desktop`;

export const moveFromInitFolder = async (init, destination) => {
  try {
    await fs.rename(init, destination);
  } catch (e) {
    console.log(e);
  }
};

const saveDocument:(saveFunc:Function, savePath)=>Promise<boolean> = async (saveFunc, savePath) => {
    const temp = uxpfs.getTemporaryFolder();
    await app.activeDocument.saveAs.psd(temp, { alphaChannels: true, annotations: true, embedColorProfile: true, layers: true, spotColor: true, maximizeCompatibility: true});
}