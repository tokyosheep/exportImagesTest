import { app } from 'photoshop';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path-browserify';
console.log(path);

const desktopPath = `file:${os.homedir()}/Desktop`;// desktop path
console.log(desktopPath);
console.log(path.dirname(desktopPath));
console.log(path.join(desktopPath, 'ttt.txt'));

document.getElementById("btnPopulate").addEventListener("click", async () => {
    await app.showAlert('hello');
});