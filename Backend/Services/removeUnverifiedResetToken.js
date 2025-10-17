import cron from "node-cron";
import { User } from '../Model/userModel.js';

export const removeUnverifiedTokens = () => {
  cron.schedule("*/2 * * * *", async () => {
    const now = new Date();

    await User.updateMany(
      { resetPasswordTokenExpire: { $lt: now } },
      { $unset: { resetPasswordToken: "", resetPasswordTokenExpire: "" } }
    );
  });
};