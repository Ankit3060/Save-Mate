import cron from 'node-cron';
import { Transaction } from '../Model/transactionModel.js';

// Schedule a task to run every day at midnight
export const deleteTransactionPermanently = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running daily cleanup job for old transactions in bin...');

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        try {
            const result = await Transaction.deleteMany({
                isDeleted: true,
                deletedAt: { $lt: thirtyDaysAgo }
            });

            if (result.deletedCount > 0) {
                console.log(`Successfully deleted ${result.deletedCount} old transactions.`);
            } else {
                console.log('No old transactions to delete.');
            }
        } catch (error) {
            console.error('Error during scheduled cleanup:', error);
        }
    });
}