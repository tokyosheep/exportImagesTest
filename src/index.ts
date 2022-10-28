import { app } from 'photoshop';
import os from 'os';
import { SaveAsPSD } from './fileSystem/saveClass';

import * as path from 'path-browserify';
const desktopPath = `file:${os.homedir()}/Desktop`;// desktop path
console.log(desktopPath);
console.log(path.dirname(desktopPath));
console.log(path.join(desktopPath, 'ttt.txt'));

document.getElementById("btnPopulate").addEventListener("click", async () => {
    console.log(app.activeDocument.saveAs);
    await app.showAlert('hello');
});

document.getElementById('savedoc').addEventListener('click', async () => {
    const savepsd = await SaveAsPSD.build(SaveAsPSD);
    savepsd.saveDocument(path.join(path.dirname(app.activeDocument.path),'jjj.psd'));
});