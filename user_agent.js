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
// 解密函数
function ShowPwd(Key, enKey) {
    var tmpPwd = "";
    var pwd = "";
    var tmpAsc;
    for (var i = 0; i < Key.length; i += 2) {
        tmpAsc = parseInt(Key.substr(i, 2), 16) ^ parseInt(enKey.substr(i, 2), 16);
        tmpPwd += String.fromCharCode(tmpAsc);
        pwd += tmpPwd;
    }
    return pwd;
}
//计算MD5值
function GetMD5(str) {
    return new Promise((resolve, reject) => {
        // 创建一个新的MD5对象
        const md5 = require('crypto').createHash('md5');
        // 将字符串转换为字节数组
        const byteArray = Buffer.from(str, 'utf8');
        // 更新哈希对象
        md5.update(byteArray);
        // 计算MD5哈希值并转换为十六进制字符串
        const hashedString = md5.digest('hex');
        // 返回计算得到的MD5值
        resolve(hashedString);
    });
}
// 筛选特定User Agent
const user_agent = browserInfo.userAgent;
if (user_agent.includes("com.alibaba.android.rimet")) {
    const dingTalkIndex = user_agent.indexOf("DingTalk");
    if (dingTalkIndex !== -1) {
        const buildIndex = user_agent.indexOf("Build/");
        const deviceInfo = buildIndex !== -1 ? user_agent.substring(buildIndex, user_agent.indexOf(";", buildIndex)) : "N/A";
        const dingTalkInfo = user_agent.substring(dingTalkIndex);
        const versionIndex = dingTalkInfo.indexOf("DingTalk/") + 9; // 9 是 "DingTalk/" 的长度
        const version = versionIndex !== -1 ? dingTalkInfo.substring(versionIndex, dingTalkInfo.indexOf(")")) : "N/A";
        // 获取操作系统信息
        const osIndexStart = user_agent.indexOf("Linux; U; ") + 10; // 10 是 "Linux; U; " 的长度
        const osIndexEnd = user_agent.indexOf(";", osIndexStart);
        const osInfo = osIndexEnd !== -1 ? user_agent.substring(osIndexStart, osIndexEnd) : "N/A";
        // 创建元素并添加内容
        const userInfoContainer = document.createElement('div');
        // 解密密钥数据
        const decryptedKeyData = ShowPwd(keyData, GetMD5(deviceName));
        // 在页面上显示用户信息和设备名称
        userInfoContainer.innerHTML = `<li>您正在使用${deviceInfo}进行认证操作</li>
            <li>您的操作系统：${osInfo}</li>
            <li>您的DingTalk版本：${version}</li> <br><br>
            <p>您正在为</p> <h2>${deviceName || '未知设备❓'}</h2> <p>进行认证</p><br>
            <p>认证密钥🔐:</p> <h2>${decryptedKeyData || '<Null>'}</h2>`;
        // 在页面上追加元素
        document.body.appendChild(userInfoContainer);
    } else {
        // 如果未检测到特定User Agent，跳转到 about:blank
        window.location.href = "about:blank";
    }
} else {
    // 如果未检测到特定User Agent，跳转到 about:blank
    window.location.href = "about:blank";
}  const dingTalkInfo = user_agent.substring(dingTalkIndex);
  const versionIndex = dingTalkInfo.indexOf("DingTalk/") + 9; // 9 是 "DingTalk/" 的长度
  const version = versionIndex !== -1 ? dingTalkInfo.substring(versionIndex, dingTalkInfo.indexOf(")")) : "N/A";
  // 获取操作系统信息
  const osIndexStart = user_agent.indexOf("Linux; U; ") + 10; // 10 是 "Linux; U; " 的长度
  const osIndexEnd = user_agent.indexOf(";", osIndexStart);
  const osInfo = osIndexEnd !== -1 ? user_agent.substring(osIndexStart, osIndexEnd) : "N/A";
  // 创建元素并添加内容
  const userInfoContainer = document.createElement('div');

  // 解密密钥数据
  const decryptedKeyData = DecryptString(keyData, "secretkey");

  // 在页面上显示用户信息和设备名称
  userInfoContainer.innerHTML = `<li>您正在使用${deviceInfo}进行认证操作</li>
  <li>您的操作系统：${osInfo}</li>
  <li>您的DingTalk版本：${version}</li> <br><br>
  <p>您正在为</p> <h2>${deviceName || '未知设备❓'}</h2> <p>进行认证</p><br>
  <p>认证密钥🔐:</p> <h2>${decryptedKeyData || '<Null>'}</h2>`;

  // 在页面上追加元素
  document.body.appendChild(userInfoContainer);
  } else {
  // 如果未检测到特定User Agent，跳转到 about:blank
  window.location.href = "about:blank";
  }
} else {
  // 如果未检测到特定User Agent，跳转到 about:blank
  window.location.href = "about:blank";
}
