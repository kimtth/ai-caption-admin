const moment = require("moment");

const today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
const yesterday1 = moment(today).add(-1, 'days');
const yesterday = moment(today).add(-1, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');

console.log(today); // 2021-02-24T00:00:00.000Z
console.log(yesterday1) // Moment<2021-02-23T09:00:00+09:00>
console.log(yesterday) // 2021-02-23T00:00:00.000Z

// db.collection('orders').find({ "order_id": store_id, "orderDate": {     
//   "$gte": new Date(today), "$lt": new Date(tomorrow)}
// }

// https://stackoverflow.com/questions/31475312/compare-date-moment-js-in-mongodb
