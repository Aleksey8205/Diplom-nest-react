const API_URL = process.env.API_URL;

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/check`, { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      return data.authenticated;
    }
    return false;
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error);
    return false;
  }
};