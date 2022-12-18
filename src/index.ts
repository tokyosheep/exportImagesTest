import { app } from 'photoshop';
import os from 'os';

import { saveDocument } from './fileSystem/saves';

import * as path from 'path-browserify';
const desktopPath = `file:${os.homedir()}/Desktop`;// desktop path
console.log(desktopPath);
console.log(path.dirname(desktopPath));
console.log(path.join(desktopPath, 'ttt.txt'));

document.getElementById("btnPopulate").addEventListener("click", async () => {
    await app.showAlert('hello');
});

document.getElementById('savedoc').addEventListener('click', async () => {
    const filePath = app.activeDocument.path;
    console.log(path.dirname(app.activeDocument.path));
    await saveDocument(`${path.dirname(app.activeDocument.path)}/abc.psd`);
});

document.getElementById("get_doc").addEventListener("click", async () => {
    console.log('activedocument', app.activeDocument);
    console.log(path.dirname(app.activeDocument.path));
    console.log(path.basename(app.activeDocument.path ,path.extname(app.activeDocument.path)));
})