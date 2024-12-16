import dotenv from 'dotenv';

dotenv.config();

const SUPERCHAT_API_KEY = process.env.SUPERCHAT_API_KEY;
const SUPERCHAT_CHANNEL_ID = process.env.SUPERCHAT_CHANNEL_ID;


export {
    SUPERCHAT_API_KEY,
    SUPERCHAT_CHANNEL_ID
};