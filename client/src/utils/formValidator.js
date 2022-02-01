export const handleValidateInput = (formData) => {
  const errors = [];
  const warnings = [];

  const passRegex =
    /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,20}$/;

  if (formData.login) {
    if (formData.login.length < 3) {
      errors.push({ login: 'Login musi posiadać min. 3 znaki' });
    } else if (formData.login.includes(' ')) {
      errors.push({ login: 'Login nie może zawierać spacji' });
    }

    if (formData.login.length === 15) {
      warnings.push({ login: 'Osiągnięto maksymalną liczbę znaków' });
    }
  }

  if (formData.name) {
    if (formData.name.length < 3) {
      errors.push({ name: 'Imię musi posiadać min. 3 znaki' });
    } else if (formData.name.includes(' ')) {
      errors.push({ name: 'Imię nie może zawierać spacji' });
    }

    if (formData.name.length === 50) {
      warnings.push({ name: 'Osiągnięto maksymalną liczbę znaków' });
    }
  }

  if (formData.password) {
    if (!formData.password.match(passRegex)) {
      errors.push({
        password:
          'Hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
      });
    } else if (formData.password.includes(' ')) {
      errors.push({ password: 'Hasło nie może zawierać spacji' });
    } else if (formData.passwordRepeated && formData.password !== formData.passwordRepeated) {
      errors.push({ password: 'Hasła nie zgadzają się ze sobą' });
    }

    if (formData.password.length === 20) {
      warnings.push({ password: 'Osiągnięto maksymalną liczbę znaków' });
    }
  }

  if (formData.oldPassword) {
    if (!formData.oldPassword.match(passRegex)) {
      errors.push({
        oldPassword:
          'Stare hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
      });
    } else if (formData.oldPassword.includes(' ')) {
      errors.push({ oldPassword: 'Stare hasło nie może zawierać spacji' });
    }

    if (formData.oldPassword.length === 20) {
      warnings.push({ oldPassword: 'Osiągnięto maksymalną liczbę znaków' });
    }
  }

  if (formData.newPassword) {
    if (!formData.newPassword.match(passRegex)) {
      errors.push({
        newPassword:
          'Nowe hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
      });
    } else if (formData.newPassword.includes(' ')) {
      errors.push({ newPassword: 'Hasło nie może zawierać spacji' });
    } else if (formData.newPassword === formData.oldPassword) {
      errors.push({
        newPassword: 'Nowe hasło musi różnić się od poprzedniego',
      });
    } else if (formData.passwordRepeated && formData.newPassword !== formData.passwordRepeated) {
      errors.push({ newPassword: 'Nowe hasła nie zgadzają się ze sobą' });
    }

    if (formData.newPassword.length === 20) {
      warnings.push({ newPassword: 'Osiągnięto maksymalną liczbę znaków' });
    }
  }

  if (formData.taskName) {
    if (formData.taskName.length < 5) {
      errors.push({ taskName: 'Zadanie musi posiadać min. 5 znaków' });
    }

    if (formData.taskName.length === 100) {
      warnings.push({ taskName: 'Osiągnięto maksymalną liczbę znaków' });
    }
  }

  return { errors, warnings };
};
