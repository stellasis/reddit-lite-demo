# Running the app

You can run the app locally or remotely with the steps below.

**_NOTE:_** The following steps assumes that you are using a Unix-based workstation 🤓. If you're a Windows user, please find the equivalent commands on your own. Sorry 🙏

## Run locally

### Prerequisites

- `node` (15.8+ or higher)

- `npm` (7.5+ or higher)

### Steps

- Clone the source code from [reddit-lite-demo repo](https://github.com/stellasis/reddit-lite-demo/tree/master) branch

- In the project directory run the following commands in order:

  - `npm install` to install the dependencies

  - `npm run start:local` to run the app

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run remotely

You can deloy this app in Heroku.

**Prequisites:**

- Heroku account (if you don't have one, you can register for free :))

### Steps

- Log in to Heroku

- Click the button to initiate the app creation process
  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/stellasis/reddit-lite-demo/tree/master)

- In your Heroku dashboard, create a new app by giving it a unique name

- Confirm by clicking `Deploy app` button

- Wait for the build to finish (it will take a while so have a ☕️)

- Click the `View` button to test the app
