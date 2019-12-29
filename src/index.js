// const { app, BrowserWindow } = require('electron')
// const path = require('path')

const electron = require('electron')
const path = require('path')
//const BrowserWindow = electron.remote.BrowserWindow
const { BrowserWindow } = require('electron').remote
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

function getXRP() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP&tsyms=USD')
        .then(res => {
            const cryptos = res.data.XRP.USD
            price.innerHTML = '$'+cryptos.toLocaleString('en')
    })
}
getXRP()
setInterval(getXRP, 10000);


notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ 
        webPreferences: {
            nodeIntegration: true
          },
        frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200})
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})