const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  scanDay = document.querySelector(".scan-day"),
  scanDate = document.querySelector(".scan-date"),
  scansContainer = document.querySelector(".scans"),
  addEventBtn = document.querySelector(".add-scan"),
  addEventWrapper = document.querySelector(".add-scan-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".scan-name "),
  addEventFrom = document.querySelector(".scan-time-from "),
  addEventTo = document.querySelector(".scan-time-to "),
  addEventSubmit = document.querySelector(".add-scan-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const scansArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     scans: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ]

const scansArr = [];
getEvents();
console.log(scansArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if scan is present on that day
    let scan = false;
    scansArr.forEach((scanObj) => {
      if (
        scanObj.day === i &&
        scanObj.month === month + 1 &&
        scanObj.year === year
      ) {
        scan = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (scan) {
        days += `<div class="day today active scan">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (scan) {
        days += `<div class="day scan">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update scanday scandate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  scanDay.innerHTML = dayName;
  scanDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update scans when a day is active
function updateEvents(date) {
  let scans = "";
  scansArr.forEach((scan) => {
    if (
      date === scan.day &&
      month + 1 === scan.month &&
      year === scan.year
    ) {
      scan.scans.forEach((scan) => {
        scans += `<div class="scan">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="scan-title">${scan.title}</h3>
            </div>
            <div class="scan-time">
              <span class="scan-time">${scan.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (scans === "") {
    scans = `<div class="no-scan">
            <h3>No Events</h3>
        </div>`;
  }
  scansContainer.innerHTML = scans;
  saveEvents();
}

//function to add scan
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in scantitle
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// function defineProperty() {
//   var osccred = document.createElement("div");
//   osccred.innerHTML =
//     "A Project By <a href='https://www.youtube.com/channel/UCiUtBDVaSmMGKxg1HYeK-BQ' target=_blank>Open Source Coding</a>";
//   osccred.style.position = "absolute";
//   osccred.style.bottom = "0";
//   osccred.style.right = "0";
//   osccred.style.fontSize = "10px";
//   osccred.style.color = "#ccc";
//   osccred.style.fontFamily = "sans-serif";
//   osccred.style.padding = "5px";
//   osccred.style.background = "#fff";
//   osccred.style.borderTopLeftRadius = "5px";
//   osccred.style.borderBottomRightRadius = "5px";
//   osccred.style.boxShadow = "0 0 5px #ccc";
//   document.body.appendChild(osccred);
// }

// defineProperty();

//allow only time in scantime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add scan to scansArr
addEventSubmit.addEventListener("click", () => {
  const scanTitle = addEventTitle.value;
  const scanTimeFrom = addEventFrom.value;
  const scanTimeTo = addEventTo.value;
  if (scanTitle === "" || scanTimeFrom === "" || scanTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = scanTimeFrom.split(":");
  const timeToArr = scanTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(scanTimeFrom);
  const timeTo = convertTime(scanTimeTo);

  //check if scan is already added
  let scanExist = false;
  scansArr.forEach((scan) => {
    if (
      scan.day === activeDay &&
      scan.month === month + 1 &&
      scan.year === year
    ) {
      scan.scans.forEach((scan) => {
        if (scan.title === scanTitle) {
          scanExist = true;
        }
      });
    }
  });
  if (scanExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: scanTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let scanAdded = false;
  if (scansArr.length > 0) {
    scansArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.scans.push(newEvent);
        scanAdded = true;
      }
    });
  }

  if (!scanAdded) {
    scansArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      scans: [newEvent],
    });
  }

  console.log(scansArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add scan class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("scan")) {
    activeDayEl.classList.add("scan");
  }
});

//function to delete scan when clicked on scan
scansContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("scan")) {
    if (confirm("Are you sure you want to delete this scan?")) {
      const scanTitle = e.target.children[0].children[1].innerHTML;
      scansArr.forEach((scan) => {
        if (
          scan.day === activeDay &&
          scan.month === month + 1 &&
          scan.year === year
        ) {
          scan.scans.forEach((item, index) => {
            if (item.title === scanTitle) {
              scan.scans.splice(index, 1);
            }
          });
          //if no scans left in a day then remove that day from scansArr
          if (scan.scans.length === 0) {
            scansArr.splice(scansArr.indexOf(scan), 1);
            //remove scan class from day
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("scan")) {
              activeDayEl.classList.remove("scan");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//function to save scans in local storage
function saveEvents() {
  localStorage.setItem("scans", JSON.stringify(scansArr));
}

//function to get scans from local storage
function getEvents() {
  //check if scans are already saved in local storage then return scan else nothing
  if (localStorage.getItem("scans") === null) {
    return;
  }
  scansArr.push(...JSON.parse(localStorage.getItem("scans")));
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
