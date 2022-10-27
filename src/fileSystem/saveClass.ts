import { app, core } from 'photoshop';
import { PhotoshopSaveOptions } from 'photoshop/dom/objects/SaveOptions';
import fs from 'fs';
import uxp from 'uxp';
import os from 'os';
import * as path from 'path-browserify';

const uxpfs = uxp.storage.localFileSystem;

class SaveBase {
    temp: any;
    fileProtocol: 'file:';
    constructor () {
        this.temp;
        this.fileProtocol = 'file:';
    }

    protected setFilePath (filePath:string, fileName:string) {
        return `${this.fileProtocol}${filePath}${fileName};`
    }

    public static async build () {
        const savebase = new SaveBase();
        savebase.temp = await uxpfs.getTemporaryFolder();
        return savebase;
    }
}

export class SaveAsPSD extends SaveBase {
    saveOption: PhotoshopSaveOptions
    constructor () {
        super();
        this.saveOption = {
            alphaChannels: true,
            annotations: true,
            embedColorProfile: true,
            layers: true,
            maximizeCompatibility: true,
            spotColor: true,
            typename: 'basic'
        }
    }

    async saveDocument (savepath:string) {
        core.executeAsModal(async () => {
            try {
                await app.activeDocument.saveAs.psd(this.temp, this.saveOption, true);
                await fs.rename(this.setFilePath(this.temp.nativePath, app.activeDocument.name),  `${savepath}/saa.psd`);
            } catch (e) {
                app.showAlert(e);
            }
        }, {commandName: 'save psd'});
    }
};
