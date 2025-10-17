import cron from "node-cron";
import { User } from '../Model/userModel.js';

export const updateTokenAttempt = () => {
    cron.schedule("*/15 * * * *", async () => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        await User.updateMany(
            { lastResetTokenTime: { $lt: oneHourAgo } },
            {
                $set: { resetTokenGeneratedTime: 0 },
                $unset: { lastResetTokenTime: "" }
            }
        )
    })
}