// joinMeet.js

// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';

// Function to join Google Meet
export async function joinGoogleMeet(meetUrl, email, password) {
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: false });  // Set to false for debugging
    const page = await browser.newPage();

    // Step 1: Navigate to Google Login page
    console.log('Navigating to Google login...');
    await page.goto('https://accounts.google.com/signin/v2/identifier', { waitUntil: 'networkidle2' });

    // Step 2: Enter email and proceed to password page
    console.log('Entering email...');
    await page.type('input[type="email"]', email, { delay: 100 });
    await page.click('#identifierNext');
    await page.waitForSelector('input[type="password"]', { visible: true });

    // Step 3: Enter password and login
    console.log('Entering password...');
    await page.type('input[type="password"]', password, { delay: 100 });
    await page.click('#passwordNext');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Step 4: Navigate to the Google Meet URL
    console.log('Navigating to the Google Meet URL...');
    await page.goto(meetUrl, { waitUntil: 'networkidle2' });

    // Step 5: Wait for "Join now" button and click it
    console.log('Waiting for "Join now" button...');
    await page.waitForSelector('div[aria-label="Join now"]', { visible: true });
    await page.click('div[aria-label="Join now"]');

    // Optionally: Wait for a few seconds to make sure the meeting is joined
    await page.waitForTimeout(5000);
    console.log('Successfully joined the Google Meet!');

    // Keep the browser open (for debugging, or close it with browser.close() when done)
    // await browser.close();
  } catch (error) {
    console.error('An error occurred while trying to join the Google Meet:', error);
  }
}
