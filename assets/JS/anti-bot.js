  const userAgent = navigator.userAgent;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api64.ipify.org?format=json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      const ip = data.ip;

      const isBlocked = checkBlocked(userAgent, ip);

      if (isBlocked) {
        window.location.replace('./block/block.html');
      }
    }
  };
  xhr.send();

  function checkBlocked(userAgent, ip) {
    const blockedUserAgents = [
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
	  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko; Google Search Console) Chrome/41.0.2272.118 Safari/537.36",
	  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
	  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Google Search Console)",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0",
	  "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots) YTranslate",
	  "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0",
	  "Mozilla/5.0 (compatible; YandexVerticals/1.0; http://yandex.com/bots)",
	  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
	  "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots) Page Audit (https://page-audit.com)",
	  "Mozilla/5.0 (compatible; YandexTracker/1.0; +http://yandex.com/bots)",
	  "Mozilla/5.0 (compatible; YandexBot/2022.03; +https://yandex.com/bots) (;-),gzip(gfe)",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.81",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4612.11",
	  "Mozilla/5.0 (compatible; YaDirectFetcher/1.0; +http://yandex.com/bots)",
	  "Mozilla/5.0 (compatible; YandexPagechecker/2.0; +http://yandex.com/bots)",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4430.93",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.40",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/2021.70; +http://yandex.com/bots)",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4579.1",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.10",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.3",
	  "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.268, XFF:141.8.142.65",
	  "Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4530.3",
	  "Mozilla/5.0 (compatible; Mail.RU_Bot/Fast/2.0)",
	  "StackRambler/2.0 (MSIE incompatible)",
	  "StackRambler/2.0",
	  "Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
	  "Mozilla/5.0 (compatible; Yahoo! Slurp/3.0; http://help.yahoo.com/help/us/ysearch/slurp)",
	  "msnbot/1.1 (+http://search.msn.com/msnbot.htm)",
	  "msnbot-media/1.0 (+http://search.msn.com/msnbot.htm)",
	  "msnbot-media/1.1 (+http://search.msn.com/msnbot.htm)",
	  "msnbot-news (+http://search.msn.com/msnbot.htm) ",
	  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"
    ];

    const blockedIPs = [
      "172.105.171.83",
	  "78.153.130.65",
	  "209.14.69.16",
	  "93.123.16.89",
	  "192.53.122.166",
	  "77.75.230.51",
	  "65.109.182.130", 
	  "195.154.114.92",
	  "185.37.147.117",
	  "167.235.135.184",
	  "141.98.234.68",
	  "5.159.54.120",
	  "193.8.95.39",
	  "185.24.253.139",
	  "185.105.238.209",
	  "185.185.132.232",
	  "181.214.197.192",
	  "185.25.204.60",
	  "38.47.52.199",
	  "185.120.77.165",
	  "88.119.179.10",
	  "178.17.171.235",
	  "185.209.161.169",
	  "178.216.200.169",
	  "45.146.7.45",
	  "185.83.213.25",
	  "185.39.205.237",
	  "185.130.104.238",
	  "194.26.229.20",
	  "92.223.65.81",
	  "194.146.57.64",
	  "185.230.55.13",
	  "179.43.148.195",
	  "77.92.151.181",
	  "45.141.149.25",
	  "5.44.42.40",
	  "185.138.164.21",
	  "185.86.77.126",
	  "91.231.182.39",
	  "91.102.183.15",
	  "185.143.223.66",
	  "5.253.30.82"
    ];

    return blockedUserAgents.includes(userAgent) || blockedIPs.includes(ip);
  }