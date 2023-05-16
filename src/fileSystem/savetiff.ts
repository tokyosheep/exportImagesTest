import { app, action, core } from 'photoshop';
import { setProtocol, DESKTOPPATH } from './root';
import uxp from 'uxp';
const uxpfs = uxp.storage.localFileSystem;
const { batchPlay } = action;

const turnStringIntoEntry:(filePath:string)=>Promise<any> = async filePath => {
  const savePath = setProtocol(filePath);
  return await uxpfs.createEntryWithUrl(savePath, { overwrite: true });
};

/**
 * idk why but Photoshop UXP still doesn't have save tiff API.
 * so we need to use batch play for it.
 * @param filePath @type {string}
 * @returns {boolean}
 */
async function saveAsTiff (filePath:string) {
  // create entry object
  const entry = await turnStringIntoEntry(filePath);
  const r = await batchPlay(
    [
      {
        _obj: 'save',
        as: {
          _obj: 'TIFF',
          byteOrder: {
            _enum: 'platform',
            _value: 'macintosh'
          }
        },
        in: {
          // on batch play, it needs create SessionToken method.
          _path: await uxpfs.createSessionToken(entry),
          _kind: 'local'
        },
        documentID: app.activeDocument.id,
        lowerCase: true,
        saveStage: {
          _enum: 'saveStageType',
          _value: 'saveSucceeded'
        },
        _options: {
          dialogOptions: 'dontDisplay'
        }
      }
    ], {}
  );
  console.log(r);
  return r;
};

export const saveTiffOnDesktop = async () => {
    core.executeAsModal(async () => {
        await saveAsTiff(path.join(DESKTOPPATH, 'img.tif'));
    }, {commandName: 'save tiff'})
}