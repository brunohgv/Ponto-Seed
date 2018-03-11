export function getZeroPad (n) {
  return (parseInt(n, 10) >= 10 ? '' : '0') + n
}

export function filterCpf (cpf) {
  return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9, 11)
}

export function timeFormat (stringDate) {
  var date = new Date(stringDate)
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  var dateString = hours + ':' + minutes + ':' + seconds
  return dateString
}

export function comprehensiveDate (stringDate) {
  var date = new Date(stringDate)
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  var dateString = hours + ':' + minutes + ':' + seconds + ' - ' + day + '/' + month + '/' + year
  return dateString
}
