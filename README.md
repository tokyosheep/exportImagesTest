# Export images test

**want to see explanation in Japanese?** [visit here](https://city-pop-mix.com/blog/UXP/localFileSystem)

This is an exmaple of UXP Photoshop Plugin.
UXP has its own filesystem. it's bit unique system. but for some users, It's too unique I guess.


## Node.js style filesystem and Entry object

Initially, UXP filesystem was strictly regulated for security reason.
since UXP allowed to access local system, it supports Node style filesystem.
but I suupose many people aren't familiar with Entry object.
and UXP Node style file system isn't same as Node.js itself.
so you'll be confused about defferences.
this is the reason I published this example.


## Check the file system through the saving functions.

This plugin has saving functions.
like save on desktop or select folder through dialog ...etc
you can see how it works on UXP system specifically.


## How to use it.

This plugin is developed on TypeScript and Webpack.
firstly, run 
```
npm install
```

then compile code through running 

```
npm run build
```
after compiling that, start plugin through UXP devtool.
I confirm it works on Win and Mac both OS.

Environment variable "HASPROTOCOL" has boolean value.
if it true, the string value "PROTOCOL" willl be added on head od any of file path,
and in case of false, it won't be added.

Since UXP supported fs module, initially file protocol was necessary for filesystem.
otherwise, it won't work, but since updated UXP 7.0, it's not required anymore.
if you need adptation for older versions, I recommend adding protocol.


## Manifest

For now manifest version have to be 5 (probably in the future it'll be newer)
declaring "localFileSystem", "fullAccess", allowing file access.
Photoshop "minVersion" have to be later than "24.2".
(I use getEntryWithUrl and createEntryWithUrl mehotd. it requires later than 24.2)
of course if you want to use on 24.2 , environment variable "HASPROTOCOL" has to be true.

see more details
[document](https://developer.adobe.com/photoshop/uxp/2022/guides/uxp_guide/uxp-misc/manifest-v5/)