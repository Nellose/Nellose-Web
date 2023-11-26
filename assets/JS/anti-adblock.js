document.addEventListener('DOMContentLoaded', () => {
  function checkAdBlocker() {
    return new Promise((resolve, reject) => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      testAd.style.position = 'absolute';
      testAd.style.top = '-10px';
      testAd.style.left = '-10px';
      testAd.style.opacity = '0.01';

      testAd.onerror = () => resolve(true);
      testAd.onload = () => resolve(false);

      document.body.appendChild(testAd);
      setTimeout(() => {
        document.body.removeChild(testAd);
        resolve(false);
      }, 100);
    });
  }

  function handleAdBlocker() {
    checkAdBlocker().then(adBlockerDetected => {
      if (adBlockerDetected) {
        window.location.href = './block/block.html';
        console.log('Adblock Detect!');
      } else {
        console.log('Adblock not Detect!');
      }
    });
  }

  handleAdBlocker();
});
