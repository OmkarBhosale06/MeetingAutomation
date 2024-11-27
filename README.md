Online Meeting Automation with Puppeteer and Express
This project allows you to automatically join online meetings hosted on platforms like Google Meet, Microsoft Teams, and Zoom. It uses Puppeteer for browser automation and Express as the backend server to handle requests.

Features
Automates joining online meetings for multiple platforms (Google Meet, Zoom, Microsoft Teams).
Logs in to the respective platform using provided credentials (email/password).
Can be integrated into applications that need automated meeting participation.
Supported Platforms
Google Meet: Joins Google Meet meetings by navigating to a provided URL.
Zoom: Automates joining Zoom meetings using meeting IDs and passcodes.
Microsoft Teams: Automates joining Microsoft Teams meetings using meeting links.
Requirements
Node.js (version 14 or higher)
Google, Zoom, or Microsoft account credentials
Meeting URLs for each platform (Google Meet, Zoom, Teams)
Installation
Clone the repository:


Copy code
git clone https://github.com/yourusername/online-meeting-automation.git
cd online-meeting-automation
Install dependencies: Make sure you have Node.js installed, then install the necessary packages:


Copy code
npm install
Set up the project for ES Modules (if needed): Ensure that your package.json includes "type": "module" to support ES module imports and exports:

json
Copy code
{
  "type": "module"
}
Configuration
Before running the application, make sure you have the following:

Account Credentials: You'll need your Google, Zoom, or Microsoft credentials (email/password).
Meeting URLs or IDs: You need valid meeting URLs for Google Meet, Zoom meeting IDs, or Microsoft Teams meeting links.
Structure
index.js: The main entry point for the Express application. It defines the /join-meeting endpoint to handle the POST request for joining a meeting.
googleMeet.js: Contains the logic for Puppeteer to log in to Google and join a Google Meet meeting.
zoom.js: Contains the logic to join a Zoom meeting using meeting ID and passcode.
teams.js: Contains the logic to join a Microsoft Teams meeting.
package.json: Project dependencies and configuration.
README.md: Project documentation (this file).
Usage
Start the Express server: Run the following command to start the server on http://localhost:3000:


Copy code
node index.js
Making a POST Request: You can make a POST request to the /join-meeting endpoint with a JSON payload containing:

platform: The platform to join (e.g., "googleMeet", "zoom", or "teams").
meetUrl: The URL of the meeting (Google Meet, Zoom, or Teams).
email: The account email.
password: The account password.
meetingId (for Zoom): The Zoom meeting ID.
passcode (for Zoom): The Zoom meeting passcode (if required).
Example Request (using cURL):


Copy code
curl -X POST http://localhost:3000/join-meeting \
-H "Content-Type: application/json" \
-d '{
  "platform": "googleMeet",
  "meetUrl": "https://meet.google.com/abc-defg-hij",
  "email": "your-email@gmail.com",
  "password": "your-password"
}'
Example Request for Zoom (using cURL):


Copy code
curl -X POST http://localhost:3000/join-meeting \
-H "Content-Type: application/json" \
-d '{
  "platform": "zoom",
  "meetingId": "1234567890",
  "passcode": "password123",
  "email": "your-email@gmail.com",
  "password": "your-password"
}'
Example Request for Teams (using cURL):


Copy code
curl -X POST http://localhost:3000/join-meeting \
-H "Content-Type: application/json" \
-d '{
  "platform": "teams",
  "meetUrl": "https://teams.microsoft.com/l/meetup-join/abc123",
  "email": "your-email@microsoft.com",
  "password": "your-password"
}'
Response:

On success:
json
Copy code
{
  "message": "Successfully joined the meeting!"
}
On failure (e.g., missing parameters or login failure):
json
Copy code
{
  "error": "Please provide platform, meetUrl, email, and password."
}
Project Structure
perl
Copy code
online-meeting-automation/
│
├── index.js             # Main Express server
├── googleMeet.js        # Puppeteer script for Google Meet
├── zoom.js              # Puppeteer script for Zoom
├── teams.js             # Puppeteer script for Microsoft Teams
├── package.json         # Project dependencies and configuration
├── package-lock.json    # Automatically generated dependencies lock
├── README.md            # Project documentation (this file)
Notes
Security: Be cautious with using plaintext credentials (email and password). It is recommended to use environment variables for storing sensitive data.
Platform-Specific Handling: Each platform may have different login flows. For example, Google Meet uses Google login, Zoom requires a meeting ID, and Teams uses Microsoft login.
Google CAPTCHA: Google may challenge automation scripts with CAPTCHA. If this happens, you may need to handle CAPTCHA manually or use a service to bypass it.
Headless Mode: By default, Puppeteer runs in non-headless mode (i.e., you will see the browser window open). You can change this to headless mode by modifying the launch() function in the respective script (e.g., googleMeet.js, zoom.js, teams.js):
javascript
Copy code
const browser = await puppeteer.launch({ headless: true });  // Run without opening the browser window
Contributing
If you'd like to contribute to this project, feel free to fork the repository, make improvements, and submit a pull request.

Fork the repo
Create a new branch (git checkout -b feature-name)
Make your changes
Commit your changes (git commit -am 'Add feature')
Push to the branch (git push origin feature-name)
Create a new Pull Request
