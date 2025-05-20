let angle;
let season = 0; // 0 = spring, 1 = summer, 2 = fall, 3 = winter
let seasonNames = ["Spring", "Summer", "Fall", "Winter"];

function setup() {
  createCanvas(800, 600);
  angle = PI / 4;
}

function draw() {
  // Determinar estación según posición del mouse
  season = int(map(mouseX, 0, width, 0, 4));
  if (season > 3) season = 3;

  // Establecer fondo según estación
  switch (season) {
    case 0:
      background(200, 250, 200); // Spring
      break;
    case 1:
      background(100, 200, 250); // Summer
      break;
    case 2:
      background(250, 200, 100); // Fall
      break;
    case 3:
      background(240, 240, 255); // Winter
      break;
  }

  // Dibujar suelo
  noStroke();
  if (season === 3) {
    fill(255); // Nieve
  } else {
    fill(34, 139, 34); // Verde
  }
  rect(0, height - 50, width, 50);

  // Dibujar árbol
  push();
  translate(width / 2, height);
  stroke(101, 67, 33);
  branch(120);
  pop();

  // Mostrar estación actual
  fill(0);
  textSize(24);
  textAlign(LEFT);
  text("Season: " + seasonNames[season], 20, 30);
  text("Move mouse left/right to change seasons", 20, 60);
}

function branch(len) {
  strokeWeight(map(len, 10, 120, 1, 15));
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 10) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();

    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();

    if (len > 40) {
      push();
      rotate(angle * 0.3);
      branch(len * 0.6);
      pop();
    }

    // Hojas o flores según estación
    if (len < 30) {
      noStroke();
      switch (season) {
        case 0: // Primavera
          fill(255, 200, 200, 150);
          ellipse(0, 0, 8, 8);
          break;
        case 1: // Verano
          fill(0, 200, 0, 150);
          ellipse(0, 0, 10, 10);
          break;
        case 2: // Otoño
          fill(random(200, 255), random(100, 180), 0, 150);
          ellipse(0, 0, 8, 8);
          break;
        case 3: // Invierno
          if (random(1) > 0.8) {
            fill(255);
            ellipse(random(-10, 10), random(-10, 10), 4, 4);
          }
          break;
      }
    }
  }
}
