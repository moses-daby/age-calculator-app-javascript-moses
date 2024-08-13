const calculateButton = document.getElementById("calculate");

// inputs
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

// errors
const dayError = document.getElementsByClassName("error")[0];
const monthError = document.getElementsByClassName("error")[1];
const yearError = document.getElementsByClassName("error")[2];

// results span
const dayResult = document.getElementsByClassName("result")[2];
const monthResult = document.getElementsByClassName("result")[1];
const yearResult = document.getElementsByClassName("result")[0];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

let birthDay;
let birthMonth;
let birthYear;

function stringToNumber(value, error) {
  error.textContent = "";
  const numberValue = Number(value);

  if (isNaN(numberValue)) {
    error.textContent = "Value is not a number";
    return;
  }
  return numberValue;
}

day.oninput = () => {
  const value = stringToNumber(day.value, dayError);
  if (value == undefined || value == "") {
    return;
  } else if (value > 31) {
    dayError.textContent = "Invalid day";
    birthDay = undefined;
    return;
  }
  birthDay = value;
};

month.oninput = () => {
  const value = stringToNumber(month.value, monthError);
  if (value == undefined || value == "") {
    return;
  } else if (value > 12) {
    monthError.textContent = "Invalid month";
    birthMonth = undefined;
    return;
  }
  birthMonth = value;
};

year.oninput = () => {
  const value = stringToNumber(year.value, yearError);
  if (value == undefined || value == "") {
    return;
  } else if (value > currentYear) {
    yearError.textContent = "Invalid year";
    return;
  }
  birthYear = value;
};

function calculateAge(birthDate, currentDate) {
  const birth = new Date(birthDate);
  const current = new Date(currentDate);

  let years = current.getFullYear() - birth.getFullYear();
  let months = current.getMonth() - birth.getMonth();
  let days = current.getDate() - birth.getDate();

  // Adjust if the current month-day combination is less than the birth month-day combination
  if (days < 0) {
    months -= 1;
    // Get the last day of the previous month
    const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust if the current month is less than the birth month
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years: years, months: months, days: days };
}

function setCalculatedAge() {
  if (birthDay == undefined) {
    dayError.textContent = "This is required";
    return;
  }
  if (birthMonth == undefined) {
    monthError.textContent = "This is required";
    return;
  }
  if (birthYear == undefined) {
    yearError.textContent = "This is required";
    return;
  }

  const birthDate = `${birthYear}-${birthMonth}-${birthDay}`; //"1995-06-15";

  const currentDate = new Date(); // or use a specific date like '2024-08-11'

  const { years, months, days } = calculateAge(birthDate, currentDate);

  yearResult.textContent = years;
  monthResult.textContent = months;
  dayResult.textContent = days;
}

calculateButton.onclick = setCalculatedAge;
