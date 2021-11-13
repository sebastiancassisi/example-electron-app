const setVersion = (selectorId, version) => {
  let element = document.getElementById(selectorId);
  if (element) {
    element.innerText = version;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const components = ['Node', 'Chromium', 'Electron'];

  for (const component of components) {
    setVersion(`version${component}`, process.versions[component.toLowerCase()]);
  }
});
