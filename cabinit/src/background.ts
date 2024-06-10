// background.js - Only necessary if you have additional background tasks

// Example of a background task: responding to messages from content scripts or the popup
// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle different actions
  if (message.action === 'someAction') {
    // Do something in response to the message
    sendResponse({ result: 'success' });
  }
  // ... other background actions ...

  return true; // Return true to indicate you wish to send a response asynchronously
});

// Add other background logic as necessary

// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createTab") {
    chrome.tabs.create({ url: request.url });
  }
});
