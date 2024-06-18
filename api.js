// api.js
function fetchBingImage() {
  fetch('https://api.andeer.top/API/bing.php')
    .then(response => response.json())
    .then(data => {
      if (data.code === 200 && data.data.pic) {
        document.body.style.backgroundImage = `url('${data.data.pic}')`;
      }
    })
    .catch(error => console.error('Error fetching Bing image:', error));
}

export { fetchBingImage };
