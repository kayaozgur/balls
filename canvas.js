var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

var c = canvas.getContext('2d');

var color = [
    "red",
    "yellow",
    "blue",
    "green",
    "pink",
    "brown",
    "purple",
    "orange"
];


function Daire(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color[Math.floor(Math.random() * color.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.strokeStyle = "yellow";
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.update = function (daireListe) {

        for (let i = 0; i < daireListe.length; i++) {
            if (this === daireListe[i]) { continue; }
            if (Math.sqrt(Math.pow(this.x - daireListe[i].x,2) + Math.pow(this.y - daireListe[i].y,2)) - (this.radius + daireListe[i].radius) < 0) {
                console.log('carpti');
                this.dx = -this.dx;
                this.dy = -this.dy;

                daireListe[i].dx = -daireListe[i].dx;
                daireListe[i].dy = -daireListe[i].dy; 
            }
            
        
        }

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}

var daireListe;

function init() {
    daireListe = [];

    for (var i = 0; i < 20; i++) {
    
        var radius = Math.random() * 30;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var hiz = Math.random() * 4;
        daireListe.push(new Daire(x, y, hiz, hiz, radius));
    }
}




function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < daireListe.length; i++) {
        daireListe[i].update(daireListe);
    }

   

}

init();
animate();