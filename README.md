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