const moment = require("moment");
const Message = require('./core/models/message');

const today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
const momentDate = moment(today).add(-1, 'days');
const yesterday = moment(today).add(-1, 'days').format('YYYY-MM-DD[T23:59:59.000Z]');
const tomorrow = moment(today).add(1, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');

console.log(today); // 2021-02-24T00:00:00.000Z
console.log(typeof today)
console.log(momentDate); // Moment<2021-02-24T09:00:00+09:00>
console.log(yesterday) // 2021-02-23T00:00:00.000Z
console.log(tomorrow) // 2021-02-26T00:00:00.000Z

let CountDays = [];
let fromDateBefore = 1;
let toDateBefore = 2;
for (let i = 0; i < 15; i++) {
  const fromDate = moment(today).subtract(fromDateBefore, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');
  const toDate = moment(today).subtract(toDateBefore, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');

  CountDays.push({
    day: `${fromDate}-${toDate}`
  })

  fromDateBefore += 1;
  toDateBefore = fromDateBefore + 1;
}
console.log(CountDays);
// https://stackoverflow.com/questions/31475312/compare-date-moment-js-in-mongodb
