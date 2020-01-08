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

function getCURR() {
    var currency = [ "BTC","XRP","ETH"]
    // var currency = ["BTC"]
    // const currency = ["BTC"]
    for (i=0;i < currency.length; i++){
        const curr = currency[i]
        console.log("currency="+curr)
        axios.get('https://min-api.cryptocompare.com/data/pricemulti', {
            params : {
                fsyms : curr,
                tsyms : "KRW"
            }
        })
        .then(res => {
            console.log("res curr="+curr)
            const cryptos = res.data[curr].KRW
            document.getElementById(curr).innerHTML = cryptos.toLocaleString('en')+"원"
        })        
    }
}
getCURR()
setInterval(getCURR, 10000);


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

ipc.on('targetPriceVal', (event, arg) => {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})