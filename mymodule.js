function myFunction (arr) {
  return arr.reduce(function(a, b) {
    return a + b
  }, 0)
}

module.exports.calculateTheNumbers = myFunction



// exports.calculateTheNumbers = function(arr) {
//   return arr.reduce(function(a, b) {
//     return a + b
//   }, 0)
// }
