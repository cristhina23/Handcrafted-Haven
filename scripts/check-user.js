// Temporary script to check user data
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: String,
  username: String,
  email: String,
  fullName: String,
  image: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  profileCompleted: Boolean,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ username: 'sellerdemo' });
    
    if (!user) {
      console.log('❌ User "sellerdemo" not found');
      return;
    }

    console.log('\n📋 User Data for "sellerdemo":');
    console.log('================================');
    console.log('Username:', user.username);
    console.log('Email:', user.email);
    console.log('Full Name:', user.fullName);
    console.log('Profile Completed Flag:', user.profileCompleted);
    console.log('\n📍 Address:');
    console.log('  Street:', user.address?.street || '❌ MISSING');
    console.log('  City:', user.address?.city || '❌ MISSING');
    console.log('  State:', user.address?.state || 'N/A');
    console.log('  Zip:', user.address?.zipCode || 'N/A');
    console.log('  Country:', user.address?.country || '❌ MISSING');
    
    const hasRequiredFields = Boolean(
      user.username &&
        user.address &&
        user.address.street &&
        user.address.city &&
        user.address.country
    );

    console.log('\n✅ Validation:');
    console.log('Has Username:', !!user.username);
    console.log('Has Address Object:', !!user.address);
    console.log('Has Street:', !!user.address?.street);
    console.log('Has City:', !!user.address?.city);
    console.log('Has Country:', !!user.address?.country);
    console.log('\n🎯 Profile Should Be Complete:', hasRequiredFields);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkUser();
