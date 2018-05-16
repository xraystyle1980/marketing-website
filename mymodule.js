function bla (arr) {
  return arr.reduce(function(a, b) {
    return a + b
  }, 0)
}

module.exports.bla = bla
//
//
//
// exports.bla = function(arr) {
//   return arr.reduce(function(a, b) {
//     return a + b
//   }, 0)
// }
