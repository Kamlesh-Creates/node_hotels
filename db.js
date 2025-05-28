const mongoose = require('mongoose');

// Connect and handle success or failure
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
.then(() => {
  console.log('✅ Initial connection successful');
})
.catch((err) => {
  console.error('❌ Initial connection error:', err.message);
});

// Event listeners for ongoing connection state
const db = mongoose.connection;

db.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

db.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

db.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

module.exports=db;
