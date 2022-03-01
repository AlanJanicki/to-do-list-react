export const handleValidateInput = (formData) => {
  const errors = [];
  const warnings = [];

  const passRegex =
    /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,20}$/;

  if (formData) {
    if (formData.login) {
      if (formData.login.trim().length < 3) {
        errors.push({ login: 'Login musi posiadać min. 3 znaki' });
      } else if (formData.login.includes(' ')) {
        errors.push({ login: 'Login nie może zawierać spacji' });
      }

      if (formData.login.length === 15) {
        warnings.push({ login: 'Osiągnięto maksymalną liczbę znaków' });
      }
    }

    if (formData.name) {
      if (formData.name.trim().length < 3) {
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

    if (formData.taskBody) {
      if (formData.taskBody.trim().length < 5) {
        errors.push({ taskBody: 'Zadanie musi posiadać min. 5 znaków' });
      }

      if (formData.taskBody.length === 100) {
        warnings.push({ taskBody: 'Osiągnięto maksymalną liczbę znaków' });
      }
    }

    if (formData.tasksArray) {
      formData.tasksArray.forEach((task) => {
        const taskTrimmedName = task.body.substring(0, 10);

        if (task.body.trim().length < 5) {
          errors.push({
            tasksFromCSV: `Zadanie ${taskTrimmedName + '...'} musi posiadać min. 5 znaków`,
          });
        }

        if (task.body.length > 100) {
          errors.push({
            tasksFromCSV: `Zadanie ${
              taskTrimmedName + '...'
            } przekracza maksymalną liczbę znaków (100)`,
          });
        }

        if (task.finishDate && isNaN(new Date(task.finishDate).getTime())) {
          errors.push({
            tasksFromCSV: `Zadanie ${
              taskTrimmedName + '...'
            } posiada nieprawidłowy format daty zakończenia`,
          });
        }

        if (
          task.priority !== '' &&
          task.priority !== '1' &&
          task.priority !== '2' &&
          task.priority !== '3'
        ) {
          errors.push({
            tasksFromCSV: `Zadanie ${
              taskTrimmedName + '...'
            } posiada nieprawidłowy format priorytetu (dopuszczalny: 1 / 2 / 3 lub brak)`,
          });
        }
      });
    }
  }
  return { errors, warnings };
};
