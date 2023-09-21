const container = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".seat:not(.occupied");
const num = document.getElementById("num");
const price = document.getElementById("price");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

//json data

// var seatdata = require("data.json");
$.getJSON("cslabdataA.json", function (seatdata) {
  var arr = seatdata[0].seats;
  var arr2 = seatdata[0].time;
  for (var i = 0; i < arr.length - 1; i++) {
    arr[i] = "A" + arr[i];
    var tmp = document.getElementById(arr[i]);
    tmp.className = "seat occupied";
  }
  let number = [0, 0, 0, 0, 0, 0];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < 6; j++) {
      if (arr[i] == "A" + j) {
        console.log(arr[i], j);
        number[j] = 1;
      }
    }
  }
  console.log(number);
  for (var j = 0; j < 6; j++) {
    if (number[j] == 1) {
      if (localStorage.getItem("A" + j) == undefined)
        localStorage.setItem("A" + j, arr2);
    } else {
      localStorage.removeItem("A" + j);
    }
    number[j] = 0;
  }
});

$.getJSON("cslabdataB.json", function (seatdata) {
  var arr = seatdata[0].seats;
  var arr2 = seatdata[0].time;
  for (var i = 0; i < arr.length - 1; i++) {
    arr[i] = "B" + arr[i];
    var tmp = document.getElementById(arr[i]);
    tmp.className = "seat occupied";
  }
  let number = [0, 0, 0, 0, 0, 0];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < 6; j++) {
      if (arr[i] == "B" + j) {
        console.log(arr[i], j);
        number[j] = 1;
      }
    }
  }
  console.log(number);
  for (var j = 0; j < 6; j++) {
    if (number[j] == 1) {
      if (localStorage.getItem("B" + j) == undefined)
        localStorage.setItem("B" + j, arr2);
    } else {
      localStorage.removeItem("B" + j);
    }
    number[j] = 0;
  }
});

$.getJSON("cslabdataC.json", function (seatdata) {
  var arr = seatdata[0].seats;
  var arr2 = seatdata[0].time;
  for (var i = 0; i < arr.length - 1; i++) {
    arr[i] = "C" + arr[i];
    var tmp = document.getElementById(arr[i]);
    tmp.className = "seat occupied";
  }
  let number = [0, 0, 0, 0, 0, 0];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < 6; j++) {
      if (arr[i] == "C" + j) {
        console.log(arr[i], j);
        number[j] = 1;
      }
    }
  }
  console.log(number);
  for (var j = 0; j < 6; j++) {
    if (number[j] == 1) {
      if (localStorage.getItem("C" + j) == undefined)
        localStorage.setItem("C" + j, arr2);
    } else {
      localStorage.removeItem("C" + j);
    }
    number[j] = 0;
  }
});
// console.log(data.json);
// var arr = data.json[0].seats;
// for (var i = 0; i < arr.length; i++) {
//   var tmp = document.getElementById(arr[i]);
//   tmp.className = "seat occupied";
// }

function show(obj) {
  //alert(obj.className);
  if (obj.className == "seat occupied") {
    var seattime = localStorage.getItem(obj.id);
    alert(seattime);
  }
}
//保存selected movie的index,和ticketPrice
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//更新num
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); //返回一个新数组index

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  num.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

//从localStorage获取数据selectedSeats数据，并把被选中的seat加一个selected属性，更新和populate UI
function populateUI() {
  selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //JSON.parse() 方法将数据转换为 JavaScript 对象。

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

//选择movie事件
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

//点击seat事件
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});


function boxOver(obj){
  if (obj.className == "seat occupied") {
    var seattime = localStorage.getItem(obj.id);
    document.getElementById("tips").innerHTML = "入座時間" + seattime;
    document.getElementById("tips").style.display="inline-block";
  }
}
function boxOut(){
  document.getElementById("tips").innerHTML = "";
  document.getElementById("tips").style.display="none";
}
