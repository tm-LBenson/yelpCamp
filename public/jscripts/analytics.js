// analytics.js
const ONE_HOUR = 60 * 60 * 1000;

const checkLastSent = () => {
  const lastSent = localStorage.getItem('lastSent');
  if (!lastSent) {
    return true;
  }

  const currentTime = new Date().getTime();
  const lastSentTime = new Date(lastSent).getTime();
  return currentTime - lastSentTime > ONE_HOUR;
};

const updateLastSent = () => {
  localStorage.setItem('lastSent', new Date().toISOString());
};

const getDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'mobile'
    : 'desktop';

const getIpAddress = async () =>
  await fetch('https://api.ipify.org?format=json')
    .then((res) => res.json())
    .then((data) => data.ip);

window.analytics = async function analytics(siteName) {
  try {
    if (!checkLastSent()) {
      return;
    }

    const ipAddress = await getIpAddress();

    const data = {
      siteName,
      date: new Date().toISOString(),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      deviceType: getDeviceType(),
      ipAddress,
    };

    const response = await fetch(
      'https://astro-server-z1u9.onrender.com/traffic-data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error sending data to the server: ${response.statusText}`,
      );
    }

    updateLastSent();
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await analytics('YelpCamp');
})();
