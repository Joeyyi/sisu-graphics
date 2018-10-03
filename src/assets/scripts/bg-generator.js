
// Based on Jared Tarbell's Substrate algorithm concept.
// http://www.complexification.net/gallery/machines/substrate/index.php

var generate = function () {
  var Boid = function (x, y, angle) {
    this.x = x;
    this.y = y;
    this.color = genColor();

    this.angle = Math.pow(Math.random(), 20) + angle;
    this.dx = Math.cos(this.angle);
    this.dy = Math.sin(this.angle);

    this.life = Math.random() * 100 + 100;
    this.dead = false;

    this.update = function () {

      context.strokeStyle = this.color;
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(this.x, this.y);

      this.x += this.dx * 3;
      this.y += this.dy * 3;
      this.life -= 1;

      context.lineTo(this.x, this.y);
      context.stroke();

      var index = (Math.floor(this.x) + width * Math.floor(this.y)) * 4;

      if (this.life <= 0) this.kill();
      if (data[index + 3] > 0) this.kill();

      if (this.x < 0 || this.x > width) this.kill();
      if (this.y < 0 || this.y > height) this.kill();
    }

    this.kill = function () {

      boids.splice(boids.indexOf(this), 1);
      this.dead = true;
    }
  }
  // const pick = Math.floor(Math.random() * 3);
  // const genColor = () => {
  //   const c = Math.floor(Math.random() * 200 + 50);
  //   const c2 = Math.floor(Math.random() * -100 + 50);
  //   let arr = new Array(3).fill(c);
  //   arr[pick] = arr[pick] + c2;
  //   return `rgb(${arr[0]},${arr[1]},${arr[2]})`
  // }
  const c = Math.floor(Math.random() * 50 + 160);
  const p = Math.floor(Math.random() * 3);
  const genColor = () => {
    let arr = new Array(3).fill(c);
    arr.forEach((item, i) => {
      if (i !== p) {
        let r = Math.floor(Math.random() * 60);
        arr[i] = item + r;
      }
    })
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`;
  }

  var width = window.innerWidth;
  var height = window.innerHeight;

  var canvas = document.getElementById('bg');

  canvas.width = width;
  canvas.height = height;

  var context = canvas.getContext('2d');

  var image, data;

  var boids = [];
  boids.push(new Boid(width / 2, height / 2.5, Math.random() * 360 * Math.PI / 180));

  var timer = 0;

  var int = setInterval(function () {

    timer += 1;
    if (timer > 1000) { clearInterval(int) };
    image = context.getImageData(0, 0, width, height);
    data = image.data;

    for (var i = 0; i < boids.length; i++) {

      var boid = boids[i];
      boid.update();

      if (!boid.dead && Math.random() > 0.9 && boids.length < 30) {

        boids.push(new Boid(boid.x, boid.y, (Math.random() > 0.5 ? 90 : -90) * Math.PI / 180 + boid.angle));
      }
    }
  }, 200 / 60);
}

export default { generate }
