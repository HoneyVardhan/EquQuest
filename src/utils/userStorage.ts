
export interface User {
  name: string;
  email: string;
  isPremium: boolean;
  loginDate: string;
}

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem('eduquest_user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('eduquest_user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null;
  }
};

export const removeUser = (): void => {
  try {
    localStorage.removeItem('eduquest_user');
  } catch (error) {
    console.error('Error removing user:', error);
  }
};

export const isLoggedIn = (): boolean => {
  return getUser() !== null;
};
