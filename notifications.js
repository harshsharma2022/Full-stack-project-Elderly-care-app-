const webpush = require('web-push');
const User = require('../models/User');
require('dotenv').config();

// Configure web-push with VAPID keys
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (!vapidPublicKey || !vapidPrivateKey) {
  console.error('VAPID keys must be set in environment variables!');
  process.exit(1);
}

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidPublicKey,
  vapidPrivateKey
);

// Send push notification to a user
const sendNotification = async (user, notification) => {
  try {
    // Get user's subscription
    const userDoc = await User.findById(user._id || user);
    if (!userDoc || !userDoc.pushSubscription) {
      return;
    }

    // Send notification
    await webpush.sendNotification(
      userDoc.pushSubscription,
      JSON.stringify(notification)
    );

    // Log notification
    console.log(`Notification sent to ${userDoc.name}:`, notification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Send notification to multiple users
const sendBulkNotification = async (users, notification) => {
  try {
    const userDocs = await User.find({ _id: { $in: users } });
    
    for (const user of userDocs) {
      if (user.pushSubscription) {
        await webpush.sendNotification(
          user.pushSubscription,
          JSON.stringify(notification)
        );
      }
    }

    console.log(`Bulk notification sent to ${userDocs.length} users:`, notification);
  } catch (error) {
    console.error('Error sending bulk notification:', error);
  }
};

// Save push subscription for a user
const savePushSubscription = async (userId, subscription) => {
  try {
    await User.findByIdAndUpdate(userId, {
      pushSubscription: subscription
    });
    console.log(`Push subscription saved for user ${userId}`);
  } catch (error) {
    console.error('Error saving push subscription:', error);
  }
};

module.exports = {
  sendNotification,
  sendBulkNotification,
  savePushSubscription,
  vapidPublicKey
}; 