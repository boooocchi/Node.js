const mySum = require("./test.js");
const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = mySum(...myArr);
console.log(result);

const multiplyArr = (arr) => {
  return arr.map((num) => {
    return num * 2;
  });
};

const myArr2 = multiplyArr(myArr);
console.log(myArr2);

const filterByAve = (arr) => {
  const arrAve = mySum(...arr) / myArr2.length;
  return arr.filter((num) => {
    return num > arrAve;
  });
};
console.log(filterByAve(myArr2));

setTimeout(() => {
  console.log("Goodbye");
}, 3000);

const Employee = {
  name: "kota",
  email: "hi@gmail.com",
  department: "sales",
  startDate: "09/01/2022"
};

const { name, email } = Employee;
const Person = { name, email };
console.log(Person);
