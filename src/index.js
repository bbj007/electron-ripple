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
    var frcurrency = ["BTC","XRP","ETH"]
    var tocurrency = ["KRW","USD"]

    for (i = 0;i < frcurrency.length; i++){
        const fcurr = frcurrency[i]
        // console.log("currency="+curr)
        for ( n = 0; n < tocurrency.length; n++) {
            const tcurr = tocurrency[n];
            let unit
            if (tcurr == "KRW") {
                unit = "₩"
            } else {
                unit = "$"
            }
            axios.get('https://min-api.cryptocompare.com/data/pricemulti', {
                params : {
                    fsyms : fcurr,
                    tsyms : tcurr
                }
            })
            .then(res => {
                // console.log("res curr="+curr)
                const cryptos = res.data[fcurr][tcurr]
                document.getElementById(`${fcurr}-${tcurr}`).innerHTML = unit+cryptos.toLocaleString('en')
            })  
        }
      
    }
}
getCURR()
setInterval(getCURR, 30000);


// notifyBtn.addEventListener('click', function(event) {
//     const modalPath = path.join('file://', __dirname, 'add.html')
//     let win = new BrowserWindow({ 
//         webPreferences: {
//             nodeIntegration: true
//           },
//         frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200})
//     win.on('close', function() { win = null })
//     win.loadURL(modalPath)
//     win.show()
// })

// ipc.on('targetPriceVal', (event, arg) => {
//     targetPriceVal = Number(arg)
//     targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
// })