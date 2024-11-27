import express from "express";
import bodyParser from "body-parser";
import { joinGoogleMeet } from "./googleMeet.js";  

const app = express();
const port = 3000;

app.use(bodyParser.json());

await joinGoogleMeet()
// app.post('/join-meet', async (req, res) => {
//     // Get the meet URL, email, and password from the request body
//     const { meetUrl, email, password } = req.body;
  
//     if (!meetUrl || !email || !password) {
//       return res.status(400).send('Please provide meetUrl, email, and password.');
//     }
  
//     try {
//       console.log('Request received to join Google Meet...');
      
//       // Call the function from joinMeet.js
//       await joinGoogleMeet(meetUrl, email, password);
      
//       return res.status(200).send('Successfully joined the Google Meet!');
//     } catch (error) {
//       console.error('Error joining Google Meet:', error);
//       return res.status(500).send('Failed to join Google Meet.');
//     }
//   });
  
  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });