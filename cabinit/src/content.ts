import { SupportedSites } from "./configs/configs";
import { ChromeStorageKeys, WidgetActionTypes } from "./enum";
import { HeadDrop } from "./pages/ExtensionOptions/tabs/tab-head-drops-control-center/HeadDropsControlCenter.context";
import { getFaceReplacedDomImage } from "./pages/Widget/Services/face-replaced-dom-image-service";
import { convertImageToBase64, updateTargetImage } from "./util";

interface AdvanceSettings {
  imageSizeFilter: {
    width: number;
    height: number;
  };
}

interface StorageData {
  advanceSettings: AdvanceSettings;
  myHeadDrops: HeadDrop[];
  favoritedHeadDropNameList: string[];
}

// Fetch advance settings from Chrome storage
const getAdvanceSettings = async (): Promise<AdvanceSettings> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["advanceSettings"], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.advanceSettings);
      }
    });
  });
};

// Fetch favorite head drops from Chrome storage
const getFavoriteHeadDropsFromChromeStorage = async (): Promise<{ favoritedHeadDrops: HeadDrop[] }> => {
  const getHeadDropsFromLocalStorage = async (type: string): Promise<HeadDrop[]> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([type], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[type]);
        }
      });
    });
  };

  try {
    const _myHeadDrops: HeadDrop[] = await getHeadDropsFromLocalStorage("myHeadDrops");
    const { favoritedHeadDropNameList } = (await chrome.storage.local.get([
      "favoritedHeadDropNameList",
    ])) as StorageData;

    return new Promise((resolve) => {
      const favoritedHeadDrops: HeadDrop[] = _myHeadDrops.filter((headDrop) =>
        favoritedHeadDropNameList?.includes(headDrop.name)
      );

      resolve({ favoritedHeadDrops });
    });
  } catch (error) {
    console.error("Failed to load head drops:", error);
    throw error;
  }
};

const handleWidgetHeadDropClick = async (headdrop: HeadDrop, targetImage: string, targetImageSelector: string) => {
  const targetImageBase64Image = await convertImageToBase64(targetImage);

  const { faceReplacedDomImage } = await getFaceReplacedDomImage({
    targetImage: targetImageBase64Image as any,
    avatar: headdrop.avatar as any,
  });

  const payload = {
    action: "update-image",
    widgetId: "widget-for-" + encodeURIComponent(window.location.href),
    targetImageSelector,
    targetImage,
    willBeUpdatedImage: faceReplacedDomImage,
  };

  updateTargetImage(payload);

  const widgetContainer = document.getElementById("my-extension-widget-container");
  if (widgetContainer) {
    widgetContainer.remove();
  }
};

const drawSideDrawer = async () => {
  let isDrawerOpen = false;
  const sideDrawerContext = document.createElement("div");
  Object.assign(sideDrawerContext.style, {
    position: "fixed",
    top: "200px",
    left: "-250px",
    width: "170px",
    height: "40px",
    backgroundColor: "#f0f0f0",
    transition: "left 0.5s ease",
    zIndex: "9999",
    display: "flex",
    paddingInlineEnd: "15px",
    alignItems: "center",
    justifyContent: "end",
    borderRadius: "0px 4px 4px 0px",
    border: "1px solid #999",
    cursor: "pointer",
  });
  sideDrawerContext.className = "side-drawer-context";
  sideDrawerContext.textContent = "Cabinit again!";
  document.body.appendChild(sideDrawerContext);

  const sideDrawerButton = document.createElement("div");
  Object.assign(sideDrawerButton.style, {
    position: "fixed",
    top: "200px",
    left: "0",
    zIndex: "10000",
    width: "40px",
    height: "40px",
    transition: "width 0.3s ease",
    cursor: "pointer",
    backgroundImage: "url('https://pngimg.com/uploads/letter_f/letter_f_PNG78.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    borderRadius: "0px 4px 4px 0px",
    border: "1px solid #999",
    backgroundColor: "#fff",
  });
  sideDrawerButton.className = "side-drawer-button";

  sideDrawerButton.addEventListener("mouseover", () => {
    if (!isDrawerOpen) {
      sideDrawerButton.style.width = "40px";
    }
  });

  sideDrawerButton.addEventListener("mouseout", () => {
    if (!isDrawerOpen) {
      sideDrawerButton.style.width = "30px";
    }
  });

  document.body.appendChild(sideDrawerButton);

  sideDrawerButton.addEventListener("click", () => {
    if (isDrawerOpen) {
      sideDrawerContext.style.left = "-250px";
      sideDrawerButton.style.width = "30px";
    } else {
      sideDrawerContext.style.left = "0";
      sideDrawerButton.style.width = "40px";
    }
    isDrawerOpen = !isDrawerOpen;
  });

  sideDrawerContext.addEventListener("click", async () => {
    await updateSiteWithFelix();
    sideDrawerContext.style.left = "-250px";
    sideDrawerButton.style.width = "30px";
  });

  document.addEventListener("click", (event) => {
    if (
      isDrawerOpen &&
      !sideDrawerContext.contains(event.target as Node) &&
      !sideDrawerButton.contains(event.target as Node)
    ) {
      sideDrawerContext.style.left = "-250px";
      sideDrawerButton.style.width = "30px";
      isDrawerOpen = false;
    }
  });
};

const checkSupportedSite = (url: string) => {
  const isSupportedSite = SupportedSites.find((site) => url.includes(site.url));

  if (!isSupportedSite) {
    console.warn("Cabinet | This site is not supported from cabinet :", url);
    return false;
  }

  return true;
};

const checkIsExtensionActive = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get([ChromeStorageKeys.isExtensionActive], (result) => {
      resolve(result[ChromeStorageKeys.isExtensionActive]);
    });
  });
};

(async () => {
  if (!checkSupportedSite(window.location.href)) {
    return;
  }

  const isExtensionActive = await checkIsExtensionActive();
  if (!isExtensionActive) {
    return;
  }

  await updateSiteWithFelix();
  await drawSideDrawer();
})();

async function updateSiteWithFelix() {
  if (document.readyState === "loading") {
    await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve));
  }

  const advanceSettings: AdvanceSettings = await getAdvanceSettings();
  const imageSizeFilter = advanceSettings?.imageSizeFilter || { width: 200, height: 300 };

  const { favoritedHeadDrops } = await getFavoriteHeadDropsFromChromeStorage();

  const activeHeadDrop = favoritedHeadDrops.find((headDrop) => headDrop.isActiveHeadDrop);

  const avatar =
    activeHeadDrop?.previewPhotoBase64 ||
    "https://www.pngitem.com/pimgs/m/272-2720656_user-profile-dummy-hd-png-download.png";

  const images = Array.from(document.querySelectorAll("img")).filter(
    (img) => img.clientWidth > imageSizeFilter.width && img.clientHeight > imageSizeFilter.height
  );

  images.forEach((img) => {
    const widgetBtn = document.createElement("div");
    widgetBtn.className = "flex-widget-btn";
    Object.assign(widgetBtn.style, {
      position: "absolute",
      top: "5px",
      left: "5px",
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      cursor: "pointer",
      zIndex: "1000",
      padding: "10px",
      border: "2px solid rgb(255, 255, 255)",
      backgroundImage: `url(${avatar})`,
      backgroundColor: "papayawhip",
      backgroundSize: "cover",
      backgroundPosition: "center",
    });

    const parent = img.parentElement as HTMLElement;
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }
    parent.appendChild(widgetBtn);

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.action === "update-image") {
          (document.querySelector(event.data.targetImageSelector) as HTMLImageElement).src =
            event.data.willBeUpdatedImage;
          document.querySelector(".my-extension-widget-container")?.remove();

          const mainImageElement = document.querySelector(`img[src="${event.data.imageSrc}"]`) as HTMLImageElement;
          if (mainImageElement) {
            mainImageElement.src = event.data.newImageUrl;
          } else {
            console.warn("Main image element not found or src does not match.");
          }
        }
      },
      false
    );

    // add message event listeners for WidgetActionTypes.UPDATE_WIDGET_IMAGE
    window.addEventListener(
      "message",
      async (event) => {
        if (event.data.action === WidgetActionTypes.UPDATE_WIDGET_IMAGE) {
          const widgetImage = document.querySelector("div.flex-widget-btn") as HTMLImageElement;
          console.log(
            "🚀 =====WidgetActionTypes.UPDATE_WIDGET_IMAGE======================= > widgetImage:",
            widgetImage
          );
          if (widgetImage) {
            document.querySelector(".my-extension-widget-container")?.remove();
            document.querySelector("div.flex-widget-btn")?.remove();
            await updateSiteWithFelix();
          }
        }
      },
      false
    );

    const afterElement = document.createElement("div");
    Object.assign(afterElement.style, {
      content: "''",
      position: "absolute",
      top: "0",
      left: "0",
      width: "0",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      transition: "none",
    });
    widgetBtn.appendChild(afterElement);

    widgetBtn.addEventListener("mouseover", () => {
      afterElement.style.width = "120%";
      afterElement.style.backgroundColor = "rgba(255, 255, 255, 0)";
      afterElement.style.transition = "all 0.4s ease-in-out";
    });

    widgetBtn.addEventListener("mouseout", () => {
      afterElement.style.width = "0";
      afterElement.style.transition = "none";
      afterElement.style.transition = "all 0.4s ease-in-out";
    });

    widgetBtn.addEventListener("click", (event) => {
      cleanEvents(event);
      handleWidgetHeadDropClick(activeHeadDrop as any, (img as HTMLImageElement).src, getCssPath(img) as any);
    });

    widgetBtn.addEventListener("contextmenu", (event) => {
      cleanEvents(event);

      const selector = getCssPath(img);
      img.classList.add("flex-manipulated");
      chrome.storage.local.set({
        targetImage: { targetImage: img.src || "", targetImageSelector: selector },
      });

      document.querySelector(".my-extension-widget-container")?.remove();

      const widgetContainer = document.createElement("div");
      Object.assign(widgetContainer.style, {
        boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        position: "absolute",
        top: "40px",
        left: "5px",
        zIndex: "2147483647",
        width: "170px",
        height: "85px",
        overflow: "hidden",
      });
      widgetContainer.className = "my-extension-widget-container";

      const widgetId = `widget-for-${img.src}`;
      widgetContainer.setAttribute("id", widgetId);

      const iframe = document.createElement("iframe");
      iframe.src = chrome.runtime.getURL("Widget/index.html");

      Object.assign(iframe.style, {
        width: "100%",
        height: "100%",
        border: "none",
      });

      widgetContainer.appendChild(iframe);

      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.onclick = () => widgetContainer.remove();
      Object.assign(closeButton.style, {
        position: "absolute",
        top: "0",
        right: "0",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        padding: "4px",
      });

      widgetContainer.appendChild(closeButton);
      parent.appendChild(widgetContainer);
    });
  });
}

function getCssPath(el: Element): string | undefined {
  if (!(el instanceof Element)) return;
  const path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += "#" + el.id;
      path.unshift(selector);
      break;
    } else {
      let sib: Element | null = el;
      let nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() === selector) nth++;
      }
      if (nth !== 1) selector += `:nth-child(${nth})`;
    }
    path.unshift(selector);
    el = el.parentNode as Element;
  }
  return path.join(" > ");
}

const cleanEvents = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};
