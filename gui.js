function GUI(x, y) {
  
  stroke(255);
  fill(255);
  textSize(28);
  text("HUNGER: " + player[0].hunger, x - width / 2, y - height / 2 + 28);
  text("THIRST: " + player[0].thirst, x - width / 2, y - height / 2 + 56);

  stroke(0, 255, 0);
  noFill();
  ellipse(x, y, player[0].dna[2]);

  stroke(255, 0, 0);
  noFill();
  ellipse(x, y, player[0].dna[3]);

  stroke(0, 0, 255);
  noFill();
  ellipse(x, y, player[0].dna[6]);
}