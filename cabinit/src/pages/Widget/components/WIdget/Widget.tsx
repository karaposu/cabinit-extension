import {
  HeadDrop,
  useHeadDropsControlCenter,
} from "../../../ExtensionOptions/tabs/tab-head-drops-control-center/HeadDropsControlCenter.context";
import { FelixTabs } from "../../../ExtensionOptions/tabs/Router/NavigationSection-types";
import { Avatar } from "../../../../interfaces/avatar";
import { getFaceReplacedDomImage } from "../../Services/face-replaced-dom-image-service";
import { convertImageToBase64, updateTargetImage, updateWidgetImage } from "../../../../util";
import "./Widget.scss";
import useHeadDropItemOperations from "../../../ExtensionOptions/tabs/tab-head-drops-control-center/Hooks/useHeadDropItemOperations";
import { WidgetActionTypes } from "../../../../enum";
import { setExtensionOptionsActiveTab } from "../../../ExtensionOptions/tabs/Router/router";

const Widget = () => {
  // const [favoritedHeadDrops, setFavoritedHeadDrops] = useState<any>([]);
  const { favoritedHeadDrops } = useHeadDropsControlCenter();

  const { toggleActiveHeadDrop } = useHeadDropItemOperations();

  const actions = [
    {
      name: "reload",
      icon: "/svg/reload.svg",
      action: () => {},
    },
    {
      name: "share",
      icon: "/svg/share.svg",
      action: () => {},
    },
    {
      name: "download",
      icon: "/svg/download.svg",
      action: () => {},
    },
    {
      name: "bookmark",
      icon: "/svg/bookmark.svg",
      action: () => {},
    },
  ];

  const handleAddMoreHeaddrop = () => {
    setExtensionOptionsActiveTab({ tab: FelixTabs.MyHeadDrops });
  };

  const isWidgetClickUpdateDOMImage = false;

  // NOTE: This function is not used in the current implementation of the widget. It is used in the previous implementation.
  const handleWidgetHeadDropClickManupulateDOMImage = (headdrop: HeadDrop) => {
    chrome.storage.local.get(["targetImage"], async ({ targetImage }) => {
      const targetImageBase64Image = (await convertImageToBase64(targetImage.targetImage)) as string;

      const { faceReplacedDomImage } = await getFaceReplacedDomImage({
        targetImage: targetImageBase64Image,
        avatar: headdrop.avatar as Avatar,
      });

      const payload = {
        action: "update-image",
        widgetId: "widget-for-" + encodeURIComponent(window.location.href),
        // headDrops: headdrops,
        // image: result.selectedImage,
        targetImageSelector: targetImage.targetImageSelector,
        targetImage: targetImage.targetImage,
        willBeUpdatedImage: faceReplacedDomImage,
      };

      updateTargetImage(payload);

      // remove my-extension-widget-container id from dom
      const widgetContainer = document.getElementById("my-extension-widget-container");

      if (widgetContainer) {
        widgetContainer.remove();
      }
    });
  };

  // NOTE: This function is not used in the current implementation of the widget. It is used in the previous implementation.
  const handleWidgetHeadDropClickUpdateWidgetImage = (headdrop: HeadDrop) => {
    toggleActiveHeadDrop(headdrop);
    updateWidgetImage({ action: WidgetActionTypes.UPDATE_WIDGET_IMAGE, image: headdrop.previewPhotoBase64 });
  };

  const handleWidgetHeadDropClick = (headdrop: HeadDrop) => {
    if (isWidgetClickUpdateDOMImage) {
      handleWidgetHeadDropClickManupulateDOMImage(headdrop);
    } else {
      handleWidgetHeadDropClickUpdateWidgetImage(headdrop);
    }
  };

  return (
    <div className="felix-widget">
      <div className="actions">
        {actions.map((action) => (
          <div
            className="action"
            onClick={action.action}
            style={{ maskImage: `url(${action.icon})`, WebkitMaskImage: `url(${action.icon})` }}
          />
        ))}
      </div>
      <div className="headdrops">
        {favoritedHeadDrops?.map((headdrop: any) => (
          <div className="headdrop-item" onClick={() => handleWidgetHeadDropClick(headdrop)}>
            <img src={headdrop.previewPhotoBase64} alt={headdrop.name} />
          </div>
        ))}
        <div
          className="add-more-headdrop"
          onClick={handleAddMoreHeaddrop}
          style={{
            maskImage: `url("/svg/add-more.svg")`,
            WebkitMaskImage: `url("/svg/add-more.svg")`,
          }}
        />
      </div>
    </div>
  );
};

export { Widget };
