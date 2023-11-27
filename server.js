const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve your static files from 'public' directory
app.use(express.urlencoded({ extended: true }));

app.post('/run-command', (req, res) => {
    const command = req.body.command; // Assuming the command is sent in the request body

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error}`);
            return res.status(500).send('Error executing command');
        }

        // Here, you would include the logic to create/generate an SVG file based on the output
        // For this example, let's assume the SVG file is generated and saved in the 'public' directory

        const svgFileName = 'image.svg'; 
        const svgFilePath = path.join(__dirname, 'axs2graph', svgFileName);

        // Respond with the path to the SVG file
        res.send({ filePath: svgFilePath });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

