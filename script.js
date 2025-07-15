function fetchLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const ctx = document.getElementById("mapCanvas").getContext("2d");

      ctx.clearRect(0, 0, 300, 300);

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(150, 150, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = "14px Arial";
      ctx.fillText("You are here", 110, 140);

      document.getElementById(
        "locationText"
      ).innerText = `Latitude: ${lat.toFixed(5)}, Longitude: ${lon.toFixed(5)}`;
    },
    (error) => {
      document.getElementById("locationText").innerText =
        "Location access denied or unavailable.";
    }
  );
}

fetchLocation();

document.getElementById("refreshBtn").addEventListener("click", fetchLocation);

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    }
  });
});

document.querySelectorAll(".cafe img").forEach((img) => observer.observe(img));
