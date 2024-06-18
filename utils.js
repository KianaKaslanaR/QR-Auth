// utils.js
function displayUserAgent() {
  var userAgentString = navigator.userAgent;
  document.getElementById('userAgent').textContent = userAgentString;
}

export { displayUserAgent };