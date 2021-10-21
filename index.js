const timer = document.getElementById("timer");
var hr = 0 ;
var min = 0;
var sec = 0;
var stopTime = true ;
var laps =[];
var lapSecond = [0];
var header = ["Split Time" , "Cycle Time (Sec)"];
let myTable = document.querySelector('#table');
var average = 0;
var capacity = 0;
var capacityAllowance = 0;

function startTimer(){
    if(stopTime == true){
        stopTime = false;
        console.log(" start button clicked");
        timeCycle()
        console.log(" start button clicked");
    }

}
function stopTimer(){
    if(stopTime == false){
        stopTime = true;
    }
}
function timeCycle(){
    
    if(stopTime == false){
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);
        sec = sec + 1;

        if(sec == 60){
            min = min +1;
            sec=0;
        }
        if(min == 60){
            hr = hr+1;
            min = 0;
        }

        if(sec < 10 || sec == 0){
            sec = '0'+ sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }
        timer.innerHTML = hr + ':' + min + ':' + sec;
        
        setTimeout("timeCycle()", 1000);

    }
}
function resetTimer() {
    timer.innerHTML = "00:00:00";
    stopTime = true;
    hr = 0;
    sec = 0;
    min = 0;
    laps=[];
    lapSecond=[0];
    average = 0;
    capacity = 0;
    capacityAllowance = 0;
    document.getElementById("table").innerHTML="";
    document.getElementById("avg-cycletime").innerText= "Average Cycle Time ="
    document.getElementById("capacity").innerText= "Capacity ="
    document.getElementById("capacity-allowance").innerText= "Capacity -(15%) ="
}

function lapTimer(){
   
    let time = document.getElementById("timer").innerText
    document.getElementById("table").innerHTML="";
    let timeSeparator = time.split(":")
    let totalSecond = parseInt(timeSeparator[0])*3600 + parseInt(timeSeparator[1])*60 + parseInt(timeSeparator[2])
    lapSecond.push(totalSecond);

    countedSecond = lapSecond[lapSecond.length-1]-lapSecond[lapSecond.length-2]

    laps.push([document.getElementById("timer").innerText,countedSecond]);


    
    document.getElementById("lap-time").innerHTML = "";
    let list = document.getElementById("lap-time");
    
    console.log(countedSecond)

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    header.forEach(headerText => {
        let header = document.createElement("th")
        let textNode = document.createTextNode(headerText)
        header.appendChild(textNode)
        headerRow.appendChild(header)
    });
    table.appendChild(headerRow)

    laps.forEach(lap =>{
        let row = document.createElement("tr")
        Object.values(lap).forEach(text =>{
            let cell = document.createElement("td")
            let textNode= document.createTextNode(text)
            cell.appendChild(textNode)
            row.appendChild(cell)
        })
        table.appendChild(row)
    })

    myTable.appendChild(table);

    
    average = Math.max(...lapSecond)/(lapSecond.length-1)
    capacity = 3600/average;
    capacityAllowance = capacity*.85;
    
    document.getElementById("avg-cycletime").innerText= "Average Cycle Time =" +average.toFixed(2)
    document.getElementById("capacity").innerText= "Capacity =" +capacity.toFixed(0)
    document.getElementById("capacity-allowance").innerText= "Capacity -(15%) =" +capacityAllowance.toFixed(0)


    
}