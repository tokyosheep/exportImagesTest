import { app, core } from 'photoshop';
import { PhotoshopSaveOptions, JPEGSaveOptions, GIFSaveOptions } from 'photoshop/dom/objects/SaveOptions';
import fs from 'fs';
import uxp from 'uxp';
import os from 'os';
import * as path from 'path-browserify';

const uxpfs = uxp.storage.localFileSystem;

class SaveBase {
    temp: any;
    fileProtocol: 'file:';
    extname: string;
    constructor (extname) {
        this.temp;
        this.fileProtocol = 'file:';
        this.extname = extname;
    }

    protected setFilePath (filePath:string, fileName:string) {
        return `${this.fileProtocol}${filePath}${fileName};`
    }

    /**
     * get path item which is saved on temp folder temporarily
     * @return {string}
     */
    protected get FilePathOnTemp () {
        return `file:${this.temp.nativePath}${path.basename(app.activeDocument.name, path.extname(app.activeDocument.name))}${this.extname}`;
    }

    /**
     * 
     * @param ClassObj Object extended from SaveBase
     * @returns Save Class
     */
    public static async build (ClassObj) {
        const savebase = new ClassObj();
        savebase.temp = await uxpfs.getTemporaryFolder();
        return savebase;
    }
}

const basicBhotoshopOption = {
  alphaChannels: true,
  annotations: true,
  embedColorProfile: true,
  layers: true,
  maximizeCompatibility: true,
  spotColor: true,
  typename: 'basic'
}

export class SaveAsPSD extends SaveBase {
    saveOption: PhotoshopSaveOptions
    constructor () {
        super('.psd');
        this.saveOption = {
            ...basicBhotoshopOption
        }
    }

    async saveDocument (savepath:string):Promise<boolean> {
        return new Promise(resolve => {
            core.executeAsModal(async () => {
                try {
                    await app.activeDocument.saveAs.psd(this.temp, this.saveOption/* copy　使えない? */);
                    await fs.rename(this.FilePathOnTemp,  `file:${savepath}`);
                    resolve(true);
                } catch (e) {
                    app.showAlert(e);
                    resolve(false);
                }
            }, {commandName: 'save psd'});
        });
    };
};

export class SaveAsPSB extends SaveBase {
    saveOption: PhotoshopSaveOptions
    constructor () {
      super('.psd');
      this.saveOption = {
          ...basicBhotoshopOption
      }
    }

    async saveDocument (savepath:string):Promise<boolean> {
       return new Promise(resolve => {
            core.executeAsModal(async () => {
                try {
                    await app.activeDocument.saveAs.psb(this.temp, this.saveOption/* copy　使えない? */);
                    await fs.rename(this.FilePathOnTemp,  `file:${savepath}`);
                    resolve(true);
                } catch (e) {
                    app.showAlert(e);
                    resolve(false);
                }
            }, {commandName: 'save psb'});
        });
    }
};

export class SaveAsJpg extends SaveBase {
    saveOptions: Partial<JPEGSaveOptions>;
    constructor () {
        super('.jpg');
        this.saveOptions = {
            quality: 12,
            typename: 'JPEGSaveOptions'
        }
    }

    async saveDocument (savepath:string):Promise<boolean> {
        return new Promise((resolve) => {
            core.executeAsModal( async () => {
                try {
                    await app.activeDocument.saveAs.jpg(this.temp, this.saveOptions);
                    await fs.rename(this.FilePathOnTemp,  `file:${savepath}`);
                    resolve(true);
                } catch (e) {
                    app.showAlert(e);
                    resolve(false);
                }
            }, {commandName: 'save jpg'});
        })
    }
};

export class SaveAsGIF extends SaveBase {
    saveOptions: Partial<GIFSaveOptions>;
    constructor () {
        super('.gif');
        this.saveOptions = {
            transparency: true
        }
    }

    async saveDocument (savepath:string):Promise<boolean> {
        return new Promise((resolve) => {
            
        });
    }
}