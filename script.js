const accessKey = "yMQ9yAlqlCkblfvdkUuY1vdSGY0n7cOxdgmtcXx40g8";

//selecting elements
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

//initializing variables
let inputData = "";
let page = 1;

//function to search images
async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  //displaying images
  const results = data.results;

  //using .map to loop through the result array (we get from the API) and create an image element for each image and append it to the searchResultsEl , also creating a link to the image and appending it to the image wrapper
  results.map((result) => {
    //creating elements for each image
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    //creating a link to the image , setting the link to open in a new tab ,display the alt description as the text and appending the image and link to the image wrapper
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // Added download button
    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download";
    downloadButton.classList.add("download-button");
    downloadButton.addEventListener("click", (event) => {
      event.preventDefault();
      const link = document.createElement("a");
      link.href = result.urls.full;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    imageWrapper.appendChild(downloadButton); // Appended download button to image wrapper
    searchResultsEl.appendChild(imageWrapper);
  });
  page++;

  //displaying show more button
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}

//event listeners for form submission and show more button
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
