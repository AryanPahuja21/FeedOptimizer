console.log("Content script loaded");

chrome.storage.sync.get("filterKeywords", (result) => {
  const filterKeywords = result.filterKeywords;
  console.log("Hello from content.js");
  console.log("Filter Keywords: ", filterKeywords);

  if (filterKeywords && filterKeywords.length > 0) {
    console.log("Filter keywords are not empty");
    const videoTitles = document.querySelectorAll("#video-title");
    videoTitles.forEach((title) => {
      const videoTitleText = title.innerText.toLowerCase();
      const matches = filterKeywords.some((keyword) =>
        videoTitleText.includes(keyword.toLowerCase())
      );
      if (!matches) {
        const videoElement = title.closest("ytd-video-renderer");
        if (videoElement) {
          videoElement.style.display = "none";
        }
      }
    });
  } else {
    console.log("No filter keywords set");
  }
});
