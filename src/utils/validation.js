export const validatePassword = (password) => {
    return password.trim().length >= 4 && password.trim().length <= 8;
};
