// main.js
import { fetchBingImage } from './api.js';
import { displayUserAgent } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchBingImage();
  displayUserAgent();
});

function displayQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const devName = urlParams.get('dev_name');
  const key = urlParams.get('key');

  document.getElementById('devName').textContent = `Developer Name: ${devName}`;
  document.getElementById('key').textContent = `Key: ${key}`;
}
