const { initializeApp } = require("firebase/app");
const { getDatabase } = require('firebase/database');
const { firebaseConfig } = require('./config.js'); // Web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

module.exports = database;