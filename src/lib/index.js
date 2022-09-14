import { getAuth, updateProfile } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'
import { app } from './config.js';

export const auth = getAuth(app);


