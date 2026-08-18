const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

async function generateImages() {
  const chakraRes = await fetch('https://fonts.gstatic.com/s/chakrapetch/v13/cIflMapbsEk7TDLdtEz1BwkeJI9FQA.ttf');
  const chakraBuf = Buffer.from(await chakraRes.arrayBuffer());

  const orbitronRes = await fetch('https://fonts.gstatic.com/s/orbitron/v31/yJWZJx4vPKAVEw64mpES.ttf');
  const orbitronBuf = Buffer.from(await orbitronRes.arrayBuffer());

  // 1. Square 1200x1200
  const svgSquare = `
  <svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#0a57f0" />
        <stop offset="55%" stop-color="#0134a3" />
        <stop offset="100%" stop-color="#00114a" />
      </radialGradient>
      <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#00051a" stop-opacity="0.6" />
      </radialGradient>
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#2b7fff" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#0034a3" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="1200" height="1200" fill="url(#bgGrad)" />
    <rect width="1200" height="1200" fill="url(#centerGlow)" />
    <rect width="1200" height="1200" fill="url(#vignette)" />

    <g transform="translate(600, 600)">
      <text
        x="0"
        y="-45"
        text-anchor="middle"
        fill="#ffffff"
        font-family="Chakra Petch"
        font-weight="700"
        font-size="62"
        letter-spacing="20"
      >COMUNIDADE</text>

      <text
        x="0"
        y="120"
        text-anchor="middle"
        fill="#ffffff"
        font-family="Chakra Petch"
        font-weight="700"
        font-size="186"
        letter-spacing="6"
      >ROSLEON</text>
    </g>
  </svg>
  `;

  // 2. Landscape 1200x630
  const svgLandscape = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGradL" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#0a57f0" />
        <stop offset="55%" stop-color="#0134a3" />
        <stop offset="100%" stop-color="#00114a" />
      </radialGradient>
      <radialGradient id="vignetteL" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#00051a" stop-opacity="0.6" />
      </radialGradient>
      <radialGradient id="centerGlowL" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#2b7fff" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#0034a3" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="1200" height="630" fill="url(#bgGradL)" />
    <rect width="1200" height="630" fill="url(#centerGlowL)" />
    <rect width="1200" height="630" fill="url(#vignetteL)" />

    <g transform="translate(600, 315)">
      <text
        x="0"
        y="-35"
        text-anchor="middle"
        fill="#ffffff"
        font-family="Chakra Petch"
        font-weight="700"
        font-size="52"
        letter-spacing="18"
      >COMUNIDADE</text>

      <text
        x="0"
        y="100"
        text-anchor="middle"
        fill="#ffffff"
        font-family="Chakra Petch"
        font-weight="700"
        font-size="155"
        letter-spacing="6"
      >ROSLEON</text>
    </g>
  </svg>
  `;

  const resvgSquare = new Resvg(svgSquare, { font: { fontBuffers: [chakraBuf, orbitronBuf] } });
  const pngSquare = resvgSquare.render().asPng();

  const resvgLandscape = new Resvg(svgLandscape, { font: { fontBuffers: [chakraBuf, orbitronBuf] } });
  const pngLandscape = resvgLandscape.render().asPng();

  if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
  if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });

  fs.writeFileSync('public/og-image.png', pngSquare);
  fs.writeFileSync('public/og-image-v2.png', pngSquare);
  fs.writeFileSync('public/og-image-landscape.png', pngLandscape);

  fs.writeFileSync('dist/og-image.png', pngSquare);
  fs.writeFileSync('dist/og-image-v2.png', pngSquare);
  fs.writeFileSync('dist/og-image-landscape.png', pngLandscape);

  console.log('Successfully generated square (1200x1200) and landscape (1200x630) OG images!');
}

generateImages().catch(console.error);
