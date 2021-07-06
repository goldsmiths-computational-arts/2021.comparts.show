const FollowMouse = (p) => {
  p.setup = () => {
    const canvasDiv = document.getElementById('sketch-container')
    const width = canvasDiv.offsetWidth
    const height = canvasDiv.offsetHeight
    p.createCanvas(width, height)
  }

  p.draw = () => {
    const size = p.map(p.mouseX, 0, p.width, 10, 100)
    p.circle(p.mouseX, p.mouseY, size)
  }
}

export default FollowMouse
