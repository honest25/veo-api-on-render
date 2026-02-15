const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

// CRITICAL: Serve static files FIRST
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// CRITICAL: Root route - serve index.html directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'public.html'));
});

// Video generation endpoint
app.post('/generate-video', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No image uploaded');
    
    const frames = [];
    for (let i = 0; i < 10; i++) {
      const frame = await sharp(req.file.path)
        .resize(512, 512)
        .png()
        .toBuffer();
      frames.push(frame);
    }
    
    res.set('Content-Type', 'image/gif');
    res.send('GIF generated successfully! (Demo mode)');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

// Health check for Render
app.get('/health', (req, res) => res.send('OK'));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 AI Video server running on port ${port}`);
});

  
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

