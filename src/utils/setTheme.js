export default function setTheme(theme) {
  const html = document.getElementsByTagName("html")[0];
  html.dataset.themeStyle = theme;
  window.localStorage.setItem("theme", theme);
}
