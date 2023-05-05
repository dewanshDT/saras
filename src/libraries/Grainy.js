class Grainy {
  constructor(id) {
    this.viewWidth,
      this.viewHeight,
      //   (this.canvas = document.getElementById(id)),
      this.ctx
    this.id = id

    // change these settings
    ;(this.patternSize = 64),
      (this.patternScaleX = 3),
      (this.patternScaleY = 1),
      (this.patternRefreshInterval = 4),
      (this.patternAlpha = 25) // int between 0 and 255,
    ;(this.patternPixelDataLength = patternSize * patternSize * 4),
      this.patternCanvas,
      this.patternCtx,
      this.patternData,
      (this.frame = 0)
  }

  // create a canvas which will render the grain
  initCanvas() {
    this.viewWidth = this.canvas.widht = this.canvas.clientWidth
    this.viewHeight = this.canvas.height = this.canvas.clientHeight
    this.ctx = this.canvas.getContext("2d")

    this.ctx.scale(patternScaleX, patternScaleY)
  }
  // create a canvas which will be used as a pattern
  initGrain() {
    const patternCanvas = document.createElement("canvas")
    patternCanvas.width = this.patternSize
    patternCanvas.height = this.patternSize
    this.patternCtx = patternCanvas.getContext("2d")
    this.patternData = this.patternCtx.createImageData(patternSize, patternSize)
  }

  // put a random shade of gray into every pixel of the pattern
  update() {
    let value

    for (var i = 0; i < patternPixelDataLength; i += 4) {
      value = (Math.random() * 255) | 0

      this.patternData.data[i] = value
      this.patternData.data[i + 1] = value
      this.patternData.data[i + 2] = value
      this.patternData.data[i + 3] = patternAlpha
    }

    this.patternCtx.putImageData(patternData, 0, 0)
  }

  // fill the canvas using the pattern
  draw() {
    this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight)

    this.ctx.fillStyle = this.ctx.createPattern(patternCanvas, "repeat")
    this.ctx.fillRect(0, 0, viewWidth, viewHeight)
  }

  loop() {
    if (++frame % patternRefreshInterval === 0) {
      this.update()
      this.draw()
    }

    requestAnimationFrame(this.loop)
  }

  //   start() {
  //     const loop = this.loop
  //     window.onload = function () {
  //       this.initCanvas()
  //       this.initGrain()
  //       requestAnimationFrame(loop)
  //     }
  //   }
}

export { Grainy }
