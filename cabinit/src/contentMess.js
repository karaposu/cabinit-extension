(async () => {
  // Wait for the DOM to be fully loaded
  if (document.readyState === "loading") {
    await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve));
  }

  const result = await chrome.storage.local.get(["myheaddrop-1"]);
  const avatar = result["myheaddrop-1"]
    ? result["myheaddrop-1"][1]
    : "https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png";

  // Find all images with rendered size bigger than 200px
  const images = Array.from(document.querySelectorAll("img")).filter(
    (img) => img.clientWidth > 200 && img.clientHeight > 300
  );

  // // 
  // const image = document.querySelector("img[src='https://cdn.dsmcdn.com/ty508/product/media/images/20220815/16/160229309/56696304/2/2_org_zoom.jpg']");

  // if (image) {
  //   image.src = "https://www.hasantezcan.dev/assets/hakkimda/oyk_2019_yaz_1.jpg";
  //   console.log("Image updated");
  // }
  // // 

  images.forEach((img) => {
    // Create widget div element and set avatar as background image
    const widgetBtn = document.createElement("div");
    widgetBtn.style.backgroundImage = `url(${avatar})`;
    widgetBtn.style.backgroundSize = "cover";
    widgetBtn.style.backgroundPosition = "center";
    widgetBtn.style.width = "30px";
    widgetBtn.style.height = "30px";
    widgetBtn.style.borderRadius = "100%";
    widgetBtn.style.cursor = "pointer";
    widgetBtn.style.position = "absolute";
    widgetBtn.style.top = "5px";
    widgetBtn.style.right = "5px";
    widgetBtn.style.zIndex = "1000";
    widgetBtn.style.padding = "10px";
    widgetBtn.style.border = "none";
    widgetBtn.style.opacity = "0.6";

    // Ensure the image's parent position is set to work with absolute positioning
    const parent = img.parentElement;
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }
    parent.appendChild(widgetBtn);

    widgetBtn.addEventListener("mouseover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      widgetBtn.style.opacity = "1";
    });

    widgetBtn.addEventListener("mouseout", (event) => {
      event.preventDefault();
      event.stopPropagation();
      widgetBtn.style.opacity = "0.6";
    });

    // Add click event listener to the widget button
    widgetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      // write image url to console log
      console.log("Image URL to send:", img.src);

      // set additional classname to img.src "flex-manipulated"
      img.classList.add("flex-manipulated");

      // write image to chrome storage
      chrome.storage.local.set({ selectedImage: img.src ? img.src : "" });

      // Close any already open widget
      const existingWidget = document.querySelector(".my-extension-widget-container");
      if (existingWidget) {
        existingWidget.remove();
      }

      // Create and style the widget container
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "my-extension-widget-container";
      widgetContainer.style.boxShadow = "0 0 5px 5px rgba(0, 0, 0, 0.2)";
      widgetContainer.style.borderRadius = "5px";
      widgetContainer.style.position = "absolute";
      widgetContainer.style.top = "60px";
      widgetContainer.style.right = "5px";
      widgetContainer.style.zIndex = "2147483647"; // Use a high z-index to ensure it's on top
      widgetContainer.style.width = "261px"; // Set a fixed width or adjust as needed
      widgetContainer.style.height = "85px"; // Set a fixed height or adjust as needed
      widgetContainer.style.overflow = "hidden";

      // Set a unique identifier for the widget related to this image
      const widgetId = `widget-for-${img.src}`;
      widgetContainer.setAttribute("id", widgetId);

      // Insert the iframe for the widget
      const iframe = document.createElement("iframe");
      iframe.src = chrome.runtime.getURL("Widget/index.html");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";

      widgetContainer.appendChild(iframe);
      parent.appendChild(widgetContainer);

      // Position the widget relative to the button
      const rect = widgetBtn.getBoundingClientRect();
      // widgetContainer.style.top = `${rect.bottom + 5}px`;
      // widgetContainer.style.left = `${rect.right + 5}px`;

      // Add a close button to the widget
      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.onclick = () => widgetContainer.remove();
      closeButton.style.position = "absolute";
      closeButton.style.top = "0";
      closeButton.style.right = "0";
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";
      closeButton.style.fontSize = "16px";
      closeButton.style.padding = "4px";

      widgetContainer.appendChild(closeButton);
    });

    // Add a message event listener to receive the "Send Image" action
    window.addEventListener(
      "message",
      (event) => {
        // Only accept messages from the expected origin
        if (event.origin !== window.location.origin) {
          return;
        }

        // Check if the message is the "Send Image" action
        if (event.data.action === "sendImage" && event.data.widgetId === widgetId) {
          console.log("Image URL to send:", img.src); // Log the image URL
        }
      },
      false
    );

    // Then in your content script of the Chrome extension, you add an event listener
  });

  // window.addEventListener("updateImageEvent", function () {
  //   // Select the image element by its class name 'flex-manipulated'

  //   var imageToUpdate = document.querySelector(".flex-manipulated");
  //   console.log("🚀 ============================ > imageToUpdate:", imageToUpdate);

  //   // Check if the image exists
  //   if (imageToUpdate) {
  //     // Update the image source
  //     imageToUpdate.src = "https://www.hasantezcan.dev/assets/hakkimda/oyk_2019_yaz_1.jpg";
  //   }
  // });
})();

// window.addEventListener("updateImageEvent", function () {
//   // Select the image element by its class name 'flex-manipulated'

//   var imageToUpdate = document.querySelector(".flex-manipulated");
//   console.log("🚀 ============================ > imageToUpdate:", imageToUpdate);

//   // Check if the image exists
//   if (imageToUpdate) {
//     // Update the image source
//     imageToUpdate.src = "https://www.hasantezcan.dev/assets/hakkimda/oyk_2019_yaz_1.jpg";
//   }
// });

// window.addEventListener("updateImageEvent", function () {
//   console.log("updateImageEvent triggered");

//   // select image src is equal https://cdn.dsmcdn.com/ty508/product/media/images/20220815/16/160229309/56696304/2/2_org_zoom.jpg
//   const image = document.querySelector("img[src='https://cdn.dsmcdn.com/ty508/product/media/images/20220815/16/160229309/56696304/2/2_org_zoom.jpg']");

//   var imageToUpdate = document.querySelector(".flex-manipulated");
//   if (image) {
//     image.src = "https://www.hasantezcan.dev/assets/hakkimda/oyk_2019_yaz_1.jpg";
//     console.log("Image updated");
//   }
// });

// // invoke above method after 2000ms
// setTimeout(() => {
//   window.dispatchEvent(new Event("updateImageEvent"));
// }, 2000);


// Listen for messages from the webpage
window.addEventListener('message', function (event) {
  // IMPORTANT: Check the origin of the data!
  if (event.origin !== window.location.origin) {
    // You can't trust messages from other origins
    return;
  }
  
  // Check if the message is of type 'UPDATE_IMAGE'
  if (event.data.type === 'UPDATE_IMAGE') {
    console.log('Received UPDATE_IMAGE message');
    var imageToUpdate = document.querySelector('.flex-manipulated');
    if (imageToUpdate) {
      // Update the image source
      imageToUpdate.src = 'https://www.hasantezcan.dev/assets/hakkimda/oyk_2019_yaz_1.jpg';
      console.log('Image updated to new source');
    }
  }
});
