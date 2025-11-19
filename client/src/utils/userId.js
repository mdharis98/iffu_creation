
export const getUserId = () => {
  let userId = localStorage.getItem('quickmart_userId');
  
  if (!userId) {
    // Generate a unique ID
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('quickmart_userId', userId);
  }
  
  return userId;
};

