// 获取URL中的查询参数
const urlParams = new URLSearchParams(window.location.search);
// 通过 'key' 参数获取传入的数据
const keyData = urlParams.get('key');
// 通过 'dv_name' 参数获取传入的设备名称
const deviceName = urlParams.get('dv_name');
// 获取浏览器信息
const browserInfo = {
  userAgent: window.navigator.userAgent,
};
// 筛选特定User Agent
const user_agent = browserInfo.userAgent;

if (user_agent.includes("com.alibaba.android.rimet")) {
  const dingTalkIndex = user_agent.indexOf("DingTalk");
  if (dingTalkIndex !== -1) {
    const buildIndex = user_agent.indexOf("Build/");
    const deviceInfo = buildIndex !== -1 ? user_agent.substring(buildIndex, user_agent.indexOf(";", buildIndex)) : "未知设备信息";
    const dingTalkInfo = user_agent.substring(dingTalkIndex);
    const versionIndex = dingTalkInfo.indexOf("DingTalk/") + 9; // 9 是 "DingTalk/" 的长度
    const version = versionIndex !== -1 ? dingTalkInfo.substring(versionIndex, dingTalkInfo.indexOf(")")) : "未知版本";
    // 获取操作系统信息
    const osIndexStart = user_agent.indexOf("Linux; U; ") + 10; // 10 是 "Linux; U; " 的长度
    const osIndexEnd = user_agent.indexOf(";", osIndexStart);
    const osInfo = osIndexEnd !== -1 ? user_agent.substring(osIndexStart, osIndexEnd) : "未知操作系统";

    // 创建元素并添加内容
    const userInfoContainer = document.createElement('div');
    const keyInfoContainer = document.createElement('div');

    // 第一步：检查key中的每一个字符是否为hex字符
    const isValidHex = /^[0-9A-Fa-f]+$/g.test(keyData);

    if (isValidHex) {
      // 第二步：将key字符串倒序，然后每两位分别转换为十进制，再把每一个十进制值转换为对应的ASCII字符
      const reversedKey = keyData.split('').reverse().join('');
      const asciiValues = [];
      for (let i = 0; i < reversedKey.length; i += 2) {
        const hexPair = reversedKey.substr(i, 2);
        const decimalValue = parseInt(hexPair, 16);
        const asciiChar = String.fromCharCode(decimalValue);
        asciiValues.push(asciiChar);
      }

      // 在页面上显示key的ASCII字符
      keyInfoContainer.innerHTML = `<p>倒序后的Key：</p> <h2>${reversedKey}</h2>
                      <p>转换为ASCII：</p> <h2>${asciiValues.join('')}</h2>`;
    } else {
      // 如果key不是hex字符，显示错误信息
      keyInfoContainer.innerHTML = `<p>错误或过期无效的密钥❌</p>`;
    }

    // 用户信息
    userInfoContainer.innerHTML = `<p>您正在使用${deviceInfo}进行认证操作</p>
                    <p>您的操作系统：${osInfo}</p>
                    <p>您的DingTalk版本：${version}</p> <br><br>
                    <p>您在这为</p> <h2>${deviceName || '未传入设备名称'}</h2> <p>进行认证</p><br>
                    <p>认证密钥🔐:</p> <h2>${keyData || '未传入key'}</h2>`;

    // 在页面上追加元素
    document.body.appendChild(userInfoContainer);
    document.body.appendChild(keyInfoContainer);
  } else {
    // 如果未检测到特定User Agent，跳转到 about:blank
    window.location.href = "about:blank";
  }
} else {
  // 如果未检测到特定User Agent，跳转到 about:blank
  window.location.href = "about:blank";
}
