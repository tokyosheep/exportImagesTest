import { app, core } from 'photoshop';
import fs from 'fs';
import uxp from 'uxp';
import os from 'os';
import * as path from 'path-browserify';

const uxpfs = uxp.storage.localFileSystem;

const FILE_PROTOCOL = 'file:';

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
      const initPath = path.dirname(app.activeDocument.path);
      const initName = path.basename(app.activeDocument.path ,path.extname(app.activeDocument.path));
      const temp = await uxpfs.getTemporaryFolder();
      await app.activeDocument.saveAs.psd(temp);
      console.log(temp);
      console.log(`${FILE_PROTOCOL}${temp.nativePath}${app.activeDocument.name}`);
      console.log(initPath);
      await fs.rename(`${FILE_PROTOCOL}${temp.nativePath}${app.activeDocument.name}`, `${FILE_PROTOCOL}${initPath}/${initName}.psd`);
      } catch (e) {
        console.log(e);
      }
    }, {commandName: 'save'});
};