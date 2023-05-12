import { app, core } from 'photoshop';
import fs from 'fs';
import uxp from 'uxp';
import { mkdir } from './basic';
import { DESKTOPPATH, setProtocol } from './root';

/* 
some examples on document use uxp local filesystem module as a fs.
but it can be confused with fs module so use variable uxpfs instead of fs.
*/
const uxpfs = uxp.storage.localFileSystem;

// if you activate the code below(import path), you'll notice some path methods won't work. 
// import path from 'path'

/**
 * == Note ==
 * 
 * since UXP updated to 6.4, It has Node.js style fileSystem.
 * but this is not same as Node.js, It's just like Node.js.
 * they have differences between them.
 * even if were web developer or enginner, I recommend to read the document carefully.
 * 
 * you need require or import for using fs module.
 * but do not require or import path module.
 * path Object isn't module. this is a Window(global) object.
 * and UXP has uncomplited path module.
 * if you required it, you'll notice some methods won't be work.
 * because uncomplited path module takes over path object.
 * 
 * on the document, path Object is classified as a Window object.
 * https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Global%20Members/Path
 * 
 * on the other hand, fs is classified as a module.
 * https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Modules/fs
 * 
 */

const whiteColor = new app.SolidColor();
whiteColor.rgb.red = 255;
whiteColor.rgb.green = 255;
whiteColor.rgb.blue = 255;

/*
    ** Note ** 
    Document save as method (and some other methods too) can only recieve Entry Object path.
    they can't recieve string file path.
    if you want to save file through string path, use methods below.
    uxpfs.getEntryWithUrl or uxpfs.createEntryWithUrl.
    some file picker, like uxpfs.getFileForSaving gives Entry Object so that's okay to
    give object you received save as method.

    check the official document more details. 
    https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Modules/uxp/Persistent%20File%20Storage/FileSystemProvider/
*/

type JpegSaveOptionsParam = {
    filePath: string
};

/**
 * save document as a jpeg image in directory where initial document was saved.
 * @param param @type {JpegSaveOptionsParam}
 * @returns {Promise<boolean>}
 */
export const saveJpeg:(param:JpegSaveOptionsParam)=>Promise<boolean> = ({
    filePath
}) => {
    return new Promise((resolve, reject) => {
        filePath = setProtocol(filePath);// adding file Protocol following the global variable
        console.log(filePath);
        core.executeAsModal(async () => {
            try {
                /* turn string path into Entry Object */
                const entrypath = await uxpfs.getEntryWithUrl(filePath);
                console.log(entrypath);
                const option = {//jpeg options
                    quality: 12,
                    embedColorProfile: true,
                    color: whiteColor,
                } as any;
                await app.activeDocument.saveAs.jpg(entrypath, option);
                resolve(true);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        }, {commandName: 'saving jpeg image'});
    });
};

type JpegWIthEntryParam = {
    entry: any//Entry Object
}

/**
 * @param param @type {JpegWIthEntryParam}
 * @returns {Promise<boolean>}
 */
const saveJpgWithEntry = async ({
    entry
}:JpegWIthEntryParam):Promise<boolean> => {
    return new Promise((resolve, reject) => {
        core.executeAsModal(async () => {
            try {
                /* 
                    saveAs method requires Save Option class exactly(JPEGSaveOptions class)
                    but just giving object following option's properties, it completely works well.
                    Idk maybe still Photoshop types have some problems.
                */
                const option = {
                    quality: 12,
                    embedColorProfile: true,
                    color: whiteColor,
                } as any;
                await app.activeDocument.saveAs.jpg(entry, option);
                resolve(true);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        }, {commandName: 'save jpeg'})
    })
}

/**
 * save image file on same directory where active document is saved.
 */
export const saveOnActiveDocumentDir = async () => {
    try {
        const flag = await saveJpeg({ filePath: app.activeDocument.path });
        console.log(flag);
    } catch (e) {
        app.showAlert(e);
    }
};

/**
 * create folder in same active document folder .
 * and save jpeg image in created folder.
 */
export const saveActiveDocumentInFolder = async () => {
    try {
        const folderName = 'jpeg';
        const folderPath = path.join(path.dirname(app.activeDocument.path), folderName);
        await mkdir(folderPath);// create follder
        await saveJpeg({ filePath: folderPath });
    } catch (e) {
        app.showAlert(e);
    }
}

/**
 * save document as jpeg image on desktop.
 * and keeping its file name
 */
export const saveOnDesktop = async () => {
    try {
        const flag = await saveJpeg({ filePath: DESKTOPPATH });
        console.log(flag);
    } catch (e) {
        app.showAlert(e);
    }
};

/**
 * save image on desktop but as a different file name.
 */
export const saveOnDesktopAsImg = async () => {
    try {
        let savePath = path.join(DESKTOPPATH, 'img.jpg');
        savePath = setProtocol(savePath);
        console.log(savePath);
        //uxpfs.createEntryWithUrl create Entry object from string file path.
        const flag = await saveJpgWithEntry({ entry: await uxpfs.createEntryWithUrl(savePath, { overwrite: true }) });
        console.log(flag);
    } catch (e) {
        app.showAlert(e);
    }
};

/**
 * save jpg image with picker(dialog)
 */
export const saveWithPicker = async () => {
    const entry = await uxpfs.getFileForSaving('catimg.jpg', {types: ['jpg']});
    console.log(entry);
    await saveJpgWithEntry({ entry });
};

/**
 * make folder in directory you picked.
 */
export const mkdirWithPicker = async () => {
    try {
        const folderEntry = await uxpfs.getFolder();
        console.log(folderEntry);
        const folerPath = setProtocol(folderEntry.nativePath);
        await fs.mkdir(path.join(folerPath, 'newfolder'));
    } catch (e) {
        await app.showAlert(e);
    }
};

/**
 * register directory path on panel.
 */
export const registerDir = async () => {
    try {
        const folderEntry = await uxpfs.getFolder();
        document.getElementById('dir').textContent = folderEntry.nativePath;
    } catch (e) {
        await app.showAlert(e);
    }
};

/**
 * write text data in registered directory.
 */
export const writeTextFile = async () => {
    try {
        const dir = document.getElementById('dir').textContent;
        if(dir === '')throw new Error('no registered directory');
        const filePath = path.join(setProtocol(dir), 'text.txt');
        console.log(filePath);
        await fs.writeFile(filePath, 'hello from photoshop');
        await app.showAlert('saved text file');
    } catch (e) {
        await app.showAlert(e);
    }
}