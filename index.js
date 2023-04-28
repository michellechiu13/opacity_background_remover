const fs = require('fs')
const PNG = require('pngjs').PNG

const whiteFile = fs.readFileSync('./input/gray.png')
const whitePNG = PNG.sync.read(whiteFile)
const percentage = 0.3

fs.createReadStream('./input/black.png')
  .pipe( new PNG({ filterType: 4 }) )
  .on('parsed', function () {
    if (whitePNG.width !== this.width || whitePNG.height !== this.height) return

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2

        // invert color
        const blackR = this.data[idx]
        const blackG = this.data[idx + 1]
        const blackB = this.data[idx + 2]
        const whiteR = whitePNG.data[idx]
        const whiteG = whitePNG.data[idx + 1]
        const whiteB = whitePNG.data[idx + 2]

        if (whiteR === blackR && whiteG === blackG && whiteB === blackB) continue

        if (blackR <= 255 * percentage && blackG <= 255 * percentage && blackB <= 255 * percentage) {
          this.data[idx + 3] = 0
          continue
        }

        const opacity = Math.min(Math.max(Math.round(((blackR - (85 - whiteR)) / 85) * 10) / 10, 0.5), 1)
        this.data[idx + 3] = Math.round(opacity * 255)
      }
    }

    this.pack().pipe(fs.createWriteStream('./output/out.png'))
  })