let particles = [];

function setup() {
  createCanvas(800, 600);
  
  // Inicializar partículas
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  // Agregar nuevas partículas si se mantiene presionado el mouse
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY));
  }
  
  // Actualizar y mostrar partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Mostrar el conteo de partículas
  fill(255);
  textSize(14);
  text("Particles: " + particles.length, 10, 20);
}

// Clase Particle
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(1, 3));
    this.acceleration = createVector(0, 0.1);
    this.lifespan = 255;
    this.col = color(random(100, 255), random(100, 255), random(100, 255), this.lifespan);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.col.setAlpha(this.lifespan);
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.position.x, this.position.y, 8, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}
