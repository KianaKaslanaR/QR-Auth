// main.js
import { fetchBingImage } from './api.js';
import { displayUserAgent } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchBingImage();
  displayUserAgent();
});

function displayQueryParams() {
  // 解析当前URL的查询字符串
  const urlParams = new URLSearchParams(window.location.search);
  // 获取特定的查询参数
  const devName = urlParams.get('dev_name');
  const key = urlParams.get('key');

  // 将参数显示到页面上
  document.getElementById('devName').textContent = devName || 'Not provided';
  document.getElementById('key').textContent = key || 'Not provided';
}