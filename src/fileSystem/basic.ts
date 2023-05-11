import { app } from 'photoshop';
import fs from 'fs';

export const mkdirUnderDocument:(folderName:string, docPath:string)=>Promise<string|false> = async (folderName, docPath) => {
    try {
        const saveFolder = path.join(docPath, folderName);
        await fs.mkdir(saveFolder);
        return saveFolder;
    } catch (e) {
        await app.showAlert(e);
        return false;
    }
};

export const mkdir:(folderPath:string)=>Promise<boolean> = async (folderPath) => {
    try {
        const f = await fs.lstat(folderPath);
        return f.isDirectory();
    } catch (e) {
        await fs.mkdir(folderPath);//if folder isn't exist, it'll generate
        return true;
    }
};