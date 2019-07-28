import service from '../service';

export const onLocalAuth = action => e => {
  e.preventDefault();
  const form = document.forms.form;
  // обращение к тегу name
  const password = form.password.value;
  const username = form.username.value;
  service.post(action, {username, password})
    .then(() => window.location.assign('#login-success')) // http://localhost:3001/#login-success
    .catch(console.log);
}

export const onClickGithubButton = (e) => {
  e.preventDefault();
  location.href = process.env.GITHUB_LOGIN_URL
}

export const onClickLogout = (e) => {
  e.preventDefault();
  service.get('/logout')
    .then(() => window.location.assign(''))
    .catch(console.log);
}
