module.exports = function(canvas) {
  return function(image) {
    var context = canvas.getContext('2d')
    canvas.width = image.width
    canvas.height = image.height
    context.drawImage(image, 0, 0)
    return context.getImageData(
      0, 0, image.width, image.height
    )
  }
}
 
