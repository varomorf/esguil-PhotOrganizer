# PhotOrganizer
A desktop app to organize all photos on a directory into new directories that will include:

* Photos to be kept.
* Photos to be retouched.
* Private photos.
* Photos to be deleted.

# Installation

## Prerequisites
You will need to have [Git](https://git-scm.com/) and [Node.js (5.x and above) + NPM (3.x and above)](http://nodejs.org). Once those are installed, you will need to install the `typings` NPM package globally (with [sudo] npm install typings --global). `Typings` handles the typescript definition files for our application.

## Getting Started

First you will need to clone the repo; then you can install the necessary NPM packages and run the app.

```bash
# Clone the repo and enter it
git clone https://github.com/varomorf/PhotOrganizer.git
cd PhotOrganizer

# Install dependencies
npm i

# Install type definitions (you may need to install typings CLI with [sudo] npm install typings --global)
typings install

# To build only
npm run build

# To build and watch for changes
npm run watch

# Start the Electron app
npm start # runs "electron app"
```

# Roadmap

Here the roadmap will appear soon.