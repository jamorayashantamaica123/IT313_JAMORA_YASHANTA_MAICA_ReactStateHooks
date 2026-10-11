# IT313 React State and Hooks

## Project Title

Lab Timer and Practice Tracker

## Problem

This project is a mobile application that helps students track the number of practice problems they solve and the time they spend working during laboratory sessions.

## Features

- Counts solved practice problems.
- Increases the count using the Solve +1 button.
- Resets the count using the Reset button.
- Displays "Great job!" after five solved problems.
- Starts and stops a stopwatch.
- Displays elapsed time in minutes and seconds.
- Shows whether the timer is running or paused.

## Approach

The LabScreen component manages the shared state using useState. The useStopwatch custom hook uses useEffect and setInterval to increase the elapsed seconds while the stopwatch is running. The cleanup function clears the interval when the running state changes or the component unmounts.

PracticeTracker and Stopwatch receive their data through props. Conditional rendering displays the appropriate messages, and event handlers control the buttons.

## How to Run

1. Install Node.js.
2. Open the project folder in a terminal.
3. Install dependencies if needed by running `npm install`.
4. Start Expo using `npx expo start`.
5. Open Expo Go on your phone and scan the QR code.

## Technologies

- React Native
- Expo
- TypeScript
- useState
- useEffect
- Custom hooks
