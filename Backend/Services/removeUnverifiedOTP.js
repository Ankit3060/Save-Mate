import cron from 'node-cron';
import { User } from '../Model/userModel.js';

export const removeUnverifiedOTP = () => {
    cron.schedule('*/2 * * * *', async () => {
        const now = new Date();
        try {
            await User.updateMany(
                { verificationCodeExpires: { $lt: now } },
                { $unset: { verificationCode: "", verificationCodeExpires: "" } }
            )
        } catch (error) {
            console.error('Error removing unverified OTPs:', error);
        }
    });
}