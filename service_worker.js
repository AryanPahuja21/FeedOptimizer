chrome.runtime.onInstalled.addListener(() => {
  console.log("Hello from service_worker.js");
  chrome.storage.sync.set({ filterKeywords: [] }, () => {
    console.log("Default filter keywords set to an empty array.");
  });

  chrome.storage.sync.get("filterKeywords", (result) => {
    console.log("Retrieved filterKeywords:", result.filterKeywords);
  });
});
