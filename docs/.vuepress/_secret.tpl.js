const encode = (appid, appkey) => {
  if (typeof appid !== 'string' || typeof appkey !== 'string') return;
  let string = appid + appkey;
  let even = '';
  let odd = '';
  for (let i = 0; i < string.length; i++) {
    if (i % 2 === 0) {
      even += string.charAt(i);
    } else {
      odd += string.charAt(i);
    }
  }
  return {
    string: even.length + ':' + even + odd,
    seat: appid.length
  };
};

module.exports = {
  translate: { // 百度翻译 API
    isEncoded: true,
    secret: encode(
      "", // appid
      "" //appkey
    )
  }
};