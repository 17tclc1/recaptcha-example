const crypto = require('crypto');
const {createCanvas} = require('canvas');
const randomBetween = (min, max) => {
  return Math.floor(Math.random()*(max-min))+min;
}
const randomRGBColor = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = {
      r: randomBetween(0, 255),
      g: randomBetween(0, 255),
      b: randomBetween(0, 255)
    };
    color.css = `rgb(${color.r},${color.g},${color.b})`;
    colors.push(color);
  }
  return colors;
}
const randomFontSize = (height) => {
  const max = height * 0.50; // 50% of height
  const min = height * 0.40; // 40% of height
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomFontRotation = () => {
  return (Math.random() * -0.4) + 0.2;
}

const generateRandomText = (length) => {
  return crypto.randomBytes(length/2).toString('hex');
}


const createRecaptcha = (width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  // Generate background
  const backgroundColors = randomRGBColor(2);
  const gradient = ctx.createLinearGradient(0, 0, width, 0);

  gradient.addColorStop(0, backgroundColors[0].css);
  gradient.addColorStop(1, backgroundColors[1].css);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Generate lines
  const lineColors = randomRGBColor(randomBetween(3, 7));

  lineColors.forEach(function(color) {
    ctx.beginPath();
    ctx.moveTo(randomBetween(0, width), randomBetween(0, height));
    ctx.bezierCurveTo(randomBetween(0, height), randomBetween(0, height), randomBetween(0, width), randomBetween(0, height), randomBetween(0, width), randomBetween(0, height));
    
    ctx.fillStyle = ctx.strokeStyle = color.css;
    ctx.lineWidth = randomBetween(2, 5);
    return ctx.stroke();
  });
  // Generate text
  const text = generateRandomText(6);
  let x = 3;
  const textColors = randomRGBColor(text.length);
  text.split('').forEach(function(letter, idx) {
    const color = textColors[idx];

    // set font
    const size = randomFontSize(height);
    ctx.font = '' + size + 'px ' + "Impact";
    ctx.textBaseline = 'top';
    const te = ctx.measureText(letter);
    const y = Math.floor(((Math.random() * height - size) / 100) + size / 3);
    
    // set color
    ctx.fillStyle = color.css;
    
    // set font rotation
    const rot = randomFontRotation();
    ctx.rotate(rot);

    // draw text
    ctx.fillText(letter, x, y);

    // unset rotation for next letter
    ctx.rotate(-rot);

    // space the x-axis for the next letter
    x += te.width+1;
  });

  return {
    url: canvas.toDataURL(),
    text,
  };
};

module.exports = {
  createRecaptcha,
}