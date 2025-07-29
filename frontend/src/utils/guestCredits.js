export const getGuestCreditsUsed = () => {
  return parseInt(localStorage.getItem('guestCredits') || '0');
};

export const incrementGuestCredits = () => {
  const used = getGuestCreditsUsed();
  localStorage.setItem('guestCredits', used + 1);
};

export const resetGuestCredits = () => {
  localStorage.setItem('guestCredits', '0');
};