const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => res.send('
<h1>Free AI Video (SVD) Ready! </h1>
<p>Upload image to /generate-video (POST)</p>
'));
app.listen(process.env.PORT || 3000, () => console.log('SVD Video AI live'));
