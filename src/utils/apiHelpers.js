// src/utils/apiHelpers.js
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

const readUsers = () => {
  try {
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
};

export const UserUseCases = {
  register: async ({ email, password, role }) => {
  const users = readUsers();
  
  // Case-insensitive email check
  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('User already exists');
  }

  const newUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(), // Store email in lowercase
    password, // Note: In production, hash this password
    role,
    otp: "1234", // Hardcoded OTP
    verified: false,
    profile: {
      personal: null,
      job: null
    },
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  // Verify the user was saved
  const updatedUsers = readUsers();
  if (!updatedUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Failed to save user to database');
  }

  return { user: newUser, otp: "1234" };
},

verifyOtp: async ({ email, otp }) => {
  const users = readUsers();
  const lowerEmail = email.toLowerCase();
  
  const userIndex = users.findIndex(user => 
    user.email.toLowerCase() === lowerEmail
  );
  
  if (userIndex === -1) {
    console.log('Current users:', users); // Debug log
    throw new Error(`Registration might have failed. No user with ${email} found.`);
  }

  if (otp !== "1234") {
    throw new Error('Invalid OTP. Please use 1234 for testing');
  }

  users[userIndex].verified = true;
  users[userIndex].otp = null;
  writeUsers(users);

  return users[userIndex];
},

  login: async ({ email, password }) => {
    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.verified) {
      throw new Error('Please verify your account first');
    }

    return user;
  },

  updateProfile: async ({ userId, personalDetails, jobDetails }) => {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex].profile = {
      personal: personalDetails || users[userIndex].profile.personal,
      job: jobDetails || users[userIndex].profile.job
    };

    writeUsers(users);

    return users[userIndex];
  },

  getProfile: async (userId) => {
    const users = readUsers();
    const user = users.find(user => user.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
};