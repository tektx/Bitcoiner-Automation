// ==UserScript==
// @name       Bitcoiner Automation
// @author     T. Knight
// @version    1
// @description  Automates the 'Bitcoiner' game
// @include      http://bitcoinergame.com/
// ==/UserScript==

var delayValue = 50;

// Main
setInterval(function() {
    // Autoclick the 'Hack Some Dollars' button
    var hackButton = document.getElementById("begging");
    hackButton.click();
}, delayValue);

setInterval(function() {
    // Find the best machine value
    var storeBTC = document.getElementsByClassName("storeBTC"),
        bestMachine = storeBTC[0].parentNode,
        bestMachineEff = 0;

    for(var i=0; i<storeBTC.length; i++) {
        var machineBTC = Number(storeBTC[i].children[0].innerText);
        var machineCost;
        var machineCostText = storeBTC[i].nextSibling.innerText.substring(0, storeBTC[i].nextSibling.innerText.length - 1).replace(/,/g, "").split(" ");
        if(machineCostText[1]) {
            if(machineCostText[1] == "million") {
                machineCost = Number(machineCostText[0]) * 1000000;
            } else if(machineCostText[1] == "billion") {
                machineCost = Number(machineCostText[0]) * 1000000000;
            } else if(machineCostText[1] == "trillion") {
                machineCost = Number(machineCostText[0]) * 1000000000000;
            } else {
                machineCost = Number(machineCostText[0]);
            }
        }
        var machineEfficiency = machineBTC / machineCost;
        if(!isNaN(machineBTC) && !isNaN(machineCost)) {
            if(machineEfficiency > bestMachineEff) {
                bestMachine.style.backgroundColor = 'transparent';
                bestMachine = storeBTC[i].parentNode;
                bestMachineEff = machineEfficiency;
                bestMachine.style.backgroundColor = 'green';
            } else {
                storeBTC[i].parentNode.style.backgroundColor = 'transparent';
            }
        }
    }
    if(bestMachine.children[3].style.color == "black") {
        console.log("# Buying machine " + bestMachine.children[1].innerText);
        bestMachine.click();
    }

    // Click 'randomEvent()' buttons
    var randomEvent = document.getElementById("randomButton");
    if(randomEvent.style.display == 'block') {
        console.log("# Clicked random event");
        randomEvent.click();
    }

    // Get current BTC price
    var currentPriceElement = document.getElementById("btcusd");
    var currentPrice = Number(currentPriceElement.innerText.split("$")[0]);
    if(currentPrice > 800) {
        currentPriceElement.style.color = 'green';
    } else if(currentPrice < 600) {
        currentPriceElement.style.color = 'red';
    } else {
        currentPriceElement.style.color = 'black';
    }
}, 2000);