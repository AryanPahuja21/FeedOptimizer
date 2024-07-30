chrome.storage.sync.get("filterKeywords", ({ filterKeywords }) => {
  if (filterKeywords.length > 0) {
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
  }
});
