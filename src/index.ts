import { app } from 'photoshop';

import { saveTiffOnDesktop } from './fileSystem/savetiff';
import { savePsdOnDesktop } from './fileSystem/savePsdBatch';
import { DESKTOPPATH } from './fileSystem/root';
import { saveOnActiveDocumentDir,
    saveOnDesktop,
    saveOnDesktopAsImg,
    saveWithPicker,
    mkdirWithPicker,
    saveActiveDocumentInFolder,
    registerDir,
    writeTextFile } from './fileSystem/saveSystem';

const save_psd_desktop = document.getElementById('save_psd_desktop');
const save_tiff = document.getElementById('save_tiff');
const save_doc = document.getElementById('save_doc');
const save_folder = document.getElementById('save_folder');
const call_desktop = document.getElementById('call_desktop');
const save_desktop = document.getElementById('save_desktop');
const save_desktop_img = document.getElementById('save_desktop_img');
const save_picker = document.getElementById('save_picker');
const mkdir_picker = document.getElementById('mkdir_picker');
const register_directory = document.getElementById('register_directory');
const writeText = document.getElementById('writeText');

save_psd_desktop.addEventListener('click', async () => {
    await savePsdOnDesktop();
});

save_tiff.addEventListener('click', async () => {
    await saveTiffOnDesktop();
});

save_folder.addEventListener('click', async () => {
    await saveActiveDocumentInFolder();
});

call_desktop.addEventListener('click', async () => {
    await app.showAlert(DESKTOPPATH);
});

save_doc.addEventListener('click', async () => {
    await saveOnActiveDocumentDir();
});

save_desktop.addEventListener('click', async () => {
    await saveOnDesktop();
});

save_desktop_img.addEventListener('click', async () => {
    await saveOnDesktopAsImg();
});

save_picker.addEventListener('click', async () => {
    await saveWithPicker();
});

mkdir_picker.addEventListener('click', async () => {
    await mkdirWithPicker();
});

register_directory.addEventListener('click', async () => {
    await registerDir();
});

writeText.addEventListener('click', async () => {
    await writeTextFile();
});