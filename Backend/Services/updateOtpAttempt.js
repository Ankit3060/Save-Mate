import cron from "node-cron";
import { User } from '../Model/userModel.js';

export const updateOtpAttempt = () => {
    cron.schedule("*/15 * * * *", async () => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        await User.updateMany(
            { lastOtpTime: { $lt: oneHourAgo } },
            {
                $set: { otpGenerated: 0, otpFailedAttempt: 0 },
                $unset: { lastOtpTime: "" }
            }
        )
    })
}