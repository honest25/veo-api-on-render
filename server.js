const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const app = express();
const upload = multer();

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

app.post('/generate-video', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded');
  
  // Simulate AI processing: resize + add "frames" effect
  const frames = [];
  for (let i = 0; i < 25; i++) {  // 25-frame "video"
    const frame = await sharp(req.file.buffer)
      .resize(512, 512)
      .composite([{ input: Buffer.from(`Frame ${i+1}`), gravity: 'southeast' }])
      .png()
      .toBuffer();
    frames.push(frame);
  }
  
  // Return animated GIF (simulates video output)
  const gifBuffer = await sharp({
    create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } }
  })
  .composite(frames.map((f, i) => ({ input: f, gravity: 'center', top: 0, left: 0 })))
  .gif()
  .toBuffer();
  
  res.set('Content-Type', 'image/gif');
  res.send(gifBuffer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`AI Video server on port ${port}`));

