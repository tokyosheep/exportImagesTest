## Export images test

This is an exmaple of UXP Photoshop Plugin.
UXP has its own filesystem. it's bit unique system. but for some users, It'S too unique I suppose.

### Node.js style filesystem and Entry object

initially , UXP filesystem was strictly regulated for security reason.
since UXP allowed to access local system, it supports Node style filesystem.
but I suupose many people aren't familiar with Entry object.
and UXP Node style file system isn't same as Node.js itself.
so you'll be confused about defferences.
this is the reason I published this example.

### check the file system through the saving functions.

this plugin has saving functions.
like save on desktop or select folder through dialog ...etc
you can see how's it work on UXP system specifically.

### How to use it.

this plugin is developed on TypeScript and Webpack.
firstly, run "npm install".
then compile code through running "npm run dev" or "npm run watch".
after compiling that, start plugin through UXP devtool.
I confirm it works on Win and Mac both OS.

environment variable "HASPROTOCOL" has boolean value.
if it true, the string value "PROTOCOL" willl be added on head od any of file path,
and in case of false, it won't be added.

since UXP supported fs module, initially file protocol was necessary for filesystem.
othereise, it won't work, but since updated UXP 7.0, it's not required anymore.
if you need adptation for older versions, I recommend adding protocol.

### manifest

for now manifest version have to be 5 (probably in the future it'll be newer)
declaring "localFileSystem", "fullAccess".
Photoshop "minVersion" have to be later than "24.2".