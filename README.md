**MEETING AUTOMATION**

Automates joining online meetings for multiple platforms (Google Meet, Zoom, Microsoft Teams).
Logs in to the respective platform using provided credentials (email/password).
Can be integrated into applications that need automated meeting participation.
Supports meeting URLs for Google Meet and Microsoft Teams, and meeting IDs for Zoom.
Flexible API that can be extended to support additional platforms in the future.
Supported Platforms

**Google Meet**: Joins Google Meet meetings by navigating to a provided URL.

**Zoom**: Automates joining Zoom meetings using meeting ID and passcode.

**Microsoft Teams**: Automates joining Microsoft Teams meetings using meeting links.
Notes

**Security**: Be cautious with using plaintext credentials (email and password). It is recommended to use environment variables for storing sensitive data.
**Platform-Specific Handling**: Each platform has its own login flow. For example:
Google Meet uses Google login.
Zoom requires a meeting ID and passcode.
Teams uses Microsoft login.

**Google CAPTCHA**: Google may challenge automation scripts with CAPTCHA. If this happens, you may need to handle CAPTCHA manually or use a service to bypass it.

**Headless Mode**: 
By default, Puppeteer runs in non-headless mode (i.e., you will see the browser window open). You can change this to headless mode by modifying the launch() function in the respective script (e.g., googleMeet.js, zoom.js, teams.js):
javascript

**Contributing**
If you'd like to contribute to this project, feel free to fork the repository, make improvements, and submit a pull request.

Fork the repo
Create a new branch (git checkout -b feature-name)
Make your changes
Commit your changes (git commit -am 'Add feature')
Push to the branch (git push origin feature-name)
Create a new Pull Request
Notes for Future Enhancements
Additional Platforms: The tool can be extended to support additional platforms like Skype, WebEx, etc.
OAuth Integration: Consider adding support for OAuth authentication for Google, Microsoft, and Zoom, instead of using plaintext credentials in the request body for better security.
Handling Multi-Factor Authentication: Some platforms may require multi-factor authentication (MFA). Handling these scenarios will enhance the robustness of the tool.
Error Handling and Logging: Improve error handling by providing more detailed error messages, and consider adding centralized logging to track issues during automation.
Customizable Headless Mode: Allow users to toggle between headless and non-headless mode for better debugging flexibility.
