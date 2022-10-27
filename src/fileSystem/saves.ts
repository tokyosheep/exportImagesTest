import { app, core } from 'photoshop';
import fs from 'fs';
import uxp from 'uxp';
import os from 'os';
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

export const saveDocument:(savePath:string)=>Promise<void> = async (savePath) => {
    return await core.executeAsModal(async () => {
      try {
      const temp = await uxpfs.getTemporaryFolder();
      console.log(fs);
      await app.activeDocument.saveAs.psd(temp, true);
      console.log(`file:${temp.nativePath}${app.activeDocument.name}`);
      console.log(`${desktopPath}/saa.jpg`);
      await fs.rename(`file:${temp.nativePath}${app.activeDocument.name}`,  `${desktopPath}/saa.psd`);
      } catch (e) {
        console.log(e);
      }
    }, {commandName: 'save'});
};