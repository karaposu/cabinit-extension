const MANIPULATE_ENDPOINT = "http://localhost:3000/api/felix/manupulate-images";

(async () => {
  await setTimeout(async () => {
    var domain = window.location.hostname;
    const { isWildFelix } = await chrome.storage.local.get(["isWildFelix"]);
    const { setupImages } = await chrome.storage.local.get(["setupImages"]);

    if (!isWildFelix) {
      return;
    }

    const rawImages = window.document.getElementsByTagName("img");
    const rawImagesArray = Array.from(rawImages);

    const images = rawImagesArray?.map((image, index) => {
      return {
        id: index,
        src: image.src,
        left: image.offsetLeft,
        top: image.offsetTop,
      };
    });

    const response = await fetch(MANIPULATE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
        setupImages,
        images,
      }),
    });

    const data = await response.json();

    const manipulatedImages = data.images;

    await setTimeout(() => {
      rawImagesArray.forEach((image, index) => {
        if (image.src === manipulatedImages[index].src) {
          image.src = manipulatedImages[index].manipulatedImage;
        }
      });
    }, 2000);

    console.table("isWildFelix:", isWildFelix);
    // @ts-ignore
    console.table("domain:", domain);
    console.table(images);
    console.table(setupImages);
    console.table("Backend Response:", data);

    await felixNotification();
  }, 2000);
})();

const felixNotification = async () => {
  // create a div element
  const felixActiveDiv = document.createElement("div");

  // set the style of the div element
  felixActiveDiv.style.position = "fixed";
  felixActiveDiv.style.top = "10px";
  felixActiveDiv.style.right = "10px";
  felixActiveDiv.style.backgroundColor = "#cdc6bc";
  felixActiveDiv.style.color = "black";
  felixActiveDiv.style.padding = "10px";
  felixActiveDiv.style.borderRadius = "5px";
  felixActiveDiv.style.fontFamily = "inherit";
  felixActiveDiv.style.fontSize = "14px";
  felixActiveDiv.style.zIndex = "999";
  felixActiveDiv.style.fontWeight = "bold";
  felixActiveDiv.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.2)";
  felixActiveDiv.innerHTML = "🔔  Cabinit manupulated images";

  // append the div element to the body
  document.body.appendChild(felixActiveDiv);

  // remove the felixActiveDiv from the DOM after 5 seconds
  await setTimeout(() => {
    document.body.removeChild(felixActiveDiv);
    felixActiveDiv.remove();
  }, 5000);
};
