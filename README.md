# Dashboard API

This repository is build using ReactJs and ExpressJs.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/Subho453/twin-assignment.git
cd twin-assignment
```

Install the dependencies:

```bash
npm install
```

## Features

- **Logging**: using rotating-file-stream and morgan
- **Error handling**: centralized error handling
- **Environment variables**: using dotenv
- **Security**: set security HTTP headers using helmet
- **Santizing**: sanitize request data against xss
- **CORS**: Cross-Origin Resource-Sharing enabled using cors
- **Compression**: gzip compression with compression

## Commands

Running app:

```bash
npm run start # To run react App
npm run start:server # To run express App
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=8000
DB_NAME=<Database-name>
DB_HOST=<Database-hostname>
DB_USER=<Database-user>
DB_PASSWORD=<Database-password>
TWILIO_ACCOUNT_SID=<twilio-account-sid>
TWILIO_AUTH_TOKEN=<twilio-auth-token>
REACT_APP_API_URL=http://localhost:8000
```

## Project Structure

```
server\
 |--config\         # Environment variables
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
src\
 |--api             # API handler using axios
 |--assets          # assets required for UI
 |--sagas           # Handling all actions and API calls
 |--store           # Storing state in redux
 |--rootReducer.js  # Setting up response in redux state
 |--App.js          # Main React Component
```

## Project Instruction

To get the response after call ended twilio provides a callback to endpoint which should be deployed for that I have used ngrok.
statusCallback: "https://f76d-2402-e280-219a-22f-901e-2c64-92a6-f96.in.ngrok.io/api/call-status" in makeCall middleware

This statusCallback need to replaced by ngrok url after running server locally. Command used:

```
ngrok http <PORT>
```
