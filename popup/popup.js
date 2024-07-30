const keywordInput = document.getElementById("keyword");
const addKeywordButton = document.getElementById("addKeyword");
const keywordList = document.getElementById("keywordList");

addKeywordButton.addEventListener("click", () => {
  const keyword = keywordInput.value.trim();
  if (keyword) {
    chrome.storage.sync.get("filterKeywords", ({ filterKeywords }) => {
      filterKeywords.push(keyword);
      chrome.storage.sync.set({ filterKeywords }, () => {
        renderKeywords(filterKeywords);
        keywordInput.value = "";
      });
    });
  }
});

chrome.storage.sync.get("filterKeywords", ({ filterKeywords }) => {
  renderKeywords(filterKeywords);
});

function renderKeywords(keywords) {
  keywordList.innerHTML = "";
  keywords.forEach((keyword, index) => {
    const li = document.createElement("li");
    li.textContent = keyword;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      keywords.splice(index, 1);
      chrome.storage.sync.set({ filterKeywords: keywords }, () => {
        renderKeywords(keywords);
      });
    });
    li.appendChild(removeButton);
    keywordList.appendChild(li);
  });
}
