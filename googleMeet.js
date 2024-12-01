// joinMeet.js

// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const speech = require('@google-cloud/speech');

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
    startRecording();

    // Keep the browser open (for debugging, or close it with browser.close() when done)
    // await browser.close();
  } catch (error) {
    console.error('An error occurred while trying to join the Google Meet:', error);
  }
}

// keep outputFile as the env variable so as to change to it whenever required.
function startRecording(outputFile) {
  const ffmpegCommand = `ffmpeg -y -f alsa -i default -t 3600 ${outputFile}`; // Record for up to 1 hour
  const recordingProcess = exec(ffmpegCommand);
  console.log(`Recording audio to ${outputFile}...`);
  return recordingProcess;
}

export async function transcribeAudio(audioFilePath) {
  let trnascriptResponse = {
    "meet-transcript": "",
    "success": true
  }
  try {
    const client = new speech.speechClient();
    const audio = {
      content: fs.readFileSync(audioFilePath).toString('base64')

    }

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = { audio, config };

    console.log('Transcribing audio...');
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log('Transcription complete:');
    console.log(transcription);
    trnascriptResponse['meet-transcript'] = transcription;
  }
  catch (e) {
    console.log('Transcription Error:', e);
    trnascriptResponse.success = false
  }


  return trnascriptResponse;

}