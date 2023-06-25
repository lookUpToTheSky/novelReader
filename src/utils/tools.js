
export function screenAdaptation () {
  var clientW = document.body.clientWidth
  var scale = 640 / 100 // 当屏幕 = 640px时，html根字体 = 100px
  document.getElementsByTagName('html')[0].style.fontSize = clientW / scale + 'px'
}
