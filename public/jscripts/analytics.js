// analytics.js
// ...

window.analytics = async function analytics(siteName, clientId) {
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
          'X-Client-ID': clientId, // Use X-Client-ID header to pass the client ID
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
  // Pass the CLIENT_ID as the second argument to the analytics function
  await analytics('YelpCamp', 'd526e49d-cc0f-468f-b04d-f59e21f6365a');
})();
