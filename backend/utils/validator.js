const STRING_TYPE = 'string';

const passRegex =
  /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,20}$/;

export const validateLoginInput = (login, password) => {
  const errors = [];
  if (typeof login !== STRING_TYPE) {
    errors.push({ login: 'Nieprawidłowy format loginu' });
  } else if (login.trim().length < 3) {
    errors.push({ login: 'Login musi posiadać min. 3 znaki' });
  } else if (login.includes(' ')) {
    errors.push({ login: 'Login nie może zawierać spacji' });
  }

  if (typeof password !== STRING_TYPE) {
    errors.push({ password: 'Nieprawidłowy format hasła' });
  } else if (!password.match(passRegex)) {
    errors.push({
      password:
        'Hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
    });
  } else if (password.includes(' ')) {
    errors.push({ password: 'Hasło nie może zawierać spacji' });
  }

  return errors;
};

export const validateRegisterInput = (avatar, login, name, password, passwordRepeated) => {
  const errors = [];

  if (typeof avatar !== STRING_TYPE) {
    errors.push({ avatar: 'Nieprawidłowy format avatara' });
  }

  if (typeof name !== STRING_TYPE) {
    errors.push({ name: 'Nieprawidłowy format imienia' });
  } else if (name.trim().length < 3) {
    errors.push({ name: 'Imię musi posiadać min. 3 znaki' });
  } else if (name.includes(' ')) {
    errors.push({ name: 'Imię nie może zawierać spacji' });
  }

  const loginErrors = validateLoginInput(login, password);
  loginErrors.forEach((error) => errors.push(error));

  if (typeof passwordRepeated !== STRING_TYPE) {
    errors.push({ passwordRepeated: 'Nieprawidłowy format powtórzonego hasła' });
  } else if (!passwordRepeated.match(passRegex)) {
    errors.push({
      passwordRepeated:
        'Powtórzone hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
    });
  } else if (passwordRepeated.includes(' ')) {
    errors.push({ passwordRepeated: 'Powtórzone hasło nie może zawierać spacji' });
  } else if (passwordRepeated !== password) {
    errors.push({ passwordRepeated: 'Hasła nie zgadzają się ze sobą' });
  }
  return errors;
};

export const validateChangeAvatarInput = (avatar, ownAvatar) => {
  const errors = [];

  if (avatar && typeof avatar !== STRING_TYPE) {
    errors.push({ avatar: 'Nieprawidłowy format avatara' });
  }

  if (ownAvatar && typeof ownAvatar !== STRING_TYPE) {
    errors.push({ ownAvatar: 'Nieprawidłowy format avatara' });
  }

  return errors;
};

export const validateChangePasswordInput = (oldPassword, newPassword, newPasswordRepeated) => {
  const errors = [];

  if (typeof oldPassword !== STRING_TYPE) {
    errors.push({ oldPassword: 'Nieprawidłowy format starego hasła' });
  } else if (!oldPassword.match(passRegex)) {
    errors.push({
      oldPassword:
        'Stare hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
    });
  } else if (oldPassword.includes(' ')) {
    errors.push({ oldPassword: 'Stare hasło nie może zawierać spacji' });
  }

  if (typeof newPassword !== STRING_TYPE) {
    errors.push({ newPassword: 'Nieprawidłowy format nowego hasła' });
  } else if (!newPassword.match(passRegex)) {
    errors.push({
      newPassword:
        'Nowe hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
    });
  } else if (newPassword.includes(' ')) {
    errors.push({ newPassword: 'Nowe hasło nie może zawierać spacji' });
  }

  if (typeof newPasswordRepeated !== STRING_TYPE) {
    errors.push({ newPasswordRepeated: 'Nieprawidłowy format powtórzonego hasła' });
  } else if (!newPasswordRepeated.match(passRegex)) {
    errors.push({
      newPasswordRepeated:
        'Powtórzone hasło musi posiadać od 8 do 20 znaków oraz zawierać: min. 1 cyfrę, 1 małą i 1 dużą literę oraz 1 znak specjalny (np. *).',
    });
  } else if (newPasswordRepeated.includes(' ')) {
    errors.push({ newPasswordRepeated: 'Powtórzone hasło nie może zawierać spacji' });
  } else if (newPasswordRepeated !== newPassword) {
    errors.push({ newPasswordRepeated: 'Hasła nie zgadzają się ze sobą' });
  }

  return errors;
};

export const validateTaskInput = (body, finishDate, priority) => {
  const errors = [];

  if (typeof body !== STRING_TYPE) {
    errors.push({ taskBody: 'Nieprawidłowy format zadania' });
  } else if (body.trim().length < 5) {
    errors.push({ taskBody: 'Zadanie musi posiadać min. 5 znaków' });
  }

  if (finishDate && (typeof finishDate !== STRING_TYPE || isNaN(new Date(finishDate).getTime()))) {
    errors.push({ taskFinishDate: 'Nieprawidłowy format daty zakończenia zadania' });
  }

  if (priority && typeof priority !== STRING_TYPE) {
    errors.push({ taskPriority: 'Nieprawidłowy format priorytetu zadania' });
  }

  return errors;
};

export const validateTasksFromCSVInput = (tasks) => {
  const errors = [];

  tasks.forEach((task) => {
    const taskTrimmedName = task.body.substring(0, 10);

    if (typeof task.body !== STRING_TYPE) {
      errors.push({
        tasksFromCSV: `Zadanie ${taskTrimmedName + '...'} posiada nieprawidłowy format`,
      });
    } else if (task.body.trim().length < 5) {
      errors.push({
        tasksFromCSV: `Zadanie ${taskTrimmedName + '...'} musi posiadać min. 5 znaków`,
      });
    }

    if (
      task.finishDate &&
      (typeof task.finishDate !== STRING_TYPE || isNaN(new Date(task.finishDate).getTime()))
    ) {
      errors.push({
        tasksFromCSV: `Zadanie ${
          taskTrimmedName + '...'
        } posiada nieprawidłowy format daty zakończenia`,
      });
    }

    if (task.priority && typeof task.priority !== STRING_TYPE) {
      errors.push({
        tasksFromCSV: `Zadanie ${taskTrimmedName + '...'} posiada nieprawidłowy format priorytetu`,
      });
    }
  });
  return errors;
};
