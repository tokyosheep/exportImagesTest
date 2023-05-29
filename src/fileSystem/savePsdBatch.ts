import { app, action, core } from 'photoshop';
import { setProtocol, DESKTOPPATH } from './root';
import { turnStringIntoEntry } from './savetiff';
import uxp from 'uxp';
const uxpfs = uxp.storage.localFileSystem;
const { batchPlay } = action;

/**
 * this is batch play which saves file as a psd.
 * saveAspsd API method never notices over 2GB filesize psd.
 * so even it force it to save over 2GB document as a psd (not psb it's psd).
 * if you want to avoid save as a 2GB psd, it's better to use batchPlay below.
 * it'll warn to over 2GB size document.
 * @param filePath @type {string}
 */
async function saveAsPsdBatchPlay(filePath:string) {
    const entry = await turnStringIntoEntry(filePath);
   const result = await batchPlay(
      [
         {
            _obj: "save",
            as: {
               _obj: "photoshop35Format"
            },
            in: {
                // on batch play, it needs create SessionToken method.
                _path: await uxpfs.createSessionToken(entry),
                _kind: 'local'
              },
              documentID: app.activeDocument.id,
              lowerCase: true,
            saveStage: {
               _enum: "saveStageType",
               _value: "saveSucceeded"
            },
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
      {}
   );
   
   const pinned = result[0];
   /*
   this contains ActionDescriptor object but in case of batch Play failed,
   it contains error status. 
   */
   console.log(pinned);
   
}

export const savePsdOnDesktop = async () => {
    core.executeAsModal(async () => {
        await saveAsPsdBatchPlay(path.join(DESKTOPPATH, 'img.psd'));
    }, {commandName: 'save psd'})
}