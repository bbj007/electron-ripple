const electron = require('electron')
const path = require('path')
//const remote = electron.remote
const { remote } = require('electron')
//const { BrowserWindow } = remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function(){
    // ipc.send('update-notify-value', document.getElementById('notifyVal').value)
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)
    var window = remote.getCurrentWindow();
    window.close()
})