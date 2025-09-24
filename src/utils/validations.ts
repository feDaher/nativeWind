export const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const validateCPF = (cpf: string) => /^\d{11}$/.test(cpf);

export const validatePassword = (password: string) => password.length >= 6;

export const passwordsMatch = (pass: string, confirm: string) => pass === confirm;
