/*
 * A BootStrap is a JavaScript file that is run when your project is loaded on the server.
 * You can use it  to initialize your application, define HTTP pattern handlers etc..
 */
 
 // Gantt DHTMLX connector + need ganttHandler.js

addHttpRequestHandler("/data/task$","/handlers/ganttHandler.js","addTask")
addHttpRequestHandler("/data/task/[0-9]{1,8}$","/handlers/ganttHandler.js","editTask")

addHttpRequestHandler("/data/link$","/handlers/ganttHandler.js","addLink")
addHttpRequestHandler("/data/link/[0-9]{1,8}$","/handlers/ganttHandler.js","editLink")