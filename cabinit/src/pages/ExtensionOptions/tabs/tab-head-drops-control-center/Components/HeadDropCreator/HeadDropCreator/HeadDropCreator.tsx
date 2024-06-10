import { HeadDrop, useHeadDropsControlCenter } from "../../../HeadDropsControlCenter.context";
import { Header } from "../../../../../../../common/components/Header/Header";
import { HeadDropCreatorContent } from "./HeadDropCreator.content";
import { HeadDropCreatorItem } from "../HeadDropCreatorItem/HeadDropCreatorItem";
import { useState } from "react";
import { getAvatar } from "../../../Services/preivew-image-service";
import { Avatar } from "../../../../../../../interfaces/avatar";
import "./HeadDropCreator.scss";
import { Loader } from "../../../../../../../common/Loader";

interface HeadDropCreatorProps {
  headDrop: HeadDrop;
  headDropIndex: number;
  showImageDialog: boolean;
  setShowImageDialog: (showImageDialog: boolean) => void;
}

export const HeadDropCreator = (props: HeadDropCreatorProps) => {
  const { headDrop, headDropIndex, showImageDialog, setShowImageDialog } = props;
  const { myHeadDrops } = useHeadDropsControlCenter();
  const [tempHeadDropFeedPhotos, setTempHeadDropFeedPhotos] = useState(headDrop.feedPhotos);

  const isSumbitButtonReady = Object.entries(tempHeadDropFeedPhotos).length === 3;
  const [isAvatarReady, setIsAvatarReady] = useState(false);

  const handleReady = async () => {
    setIsAvatarReady(true);
    const avatar = await getAvatar(tempHeadDropFeedPhotos[0]);

    const hasNoHeadDropDefined = myHeadDrops.every((item) => !item.previewPhotoBase64);

    const updatedVersionOfHeadDrop = {
      ...headDrop,
      previewPhotoBase64: (avatar as Avatar).images.head_transparent,
      feedPhotos: tempHeadDropFeedPhotos,
      avatar,
      // if there is not included any previewPhotoBase64 in myHeadDrop array, set it to true
      isActiveHeadDrop: hasNoHeadDropDefined,
    };

    if (hasNoHeadDropDefined) {
      await chrome.storage.local.set({ favoritedHeadDropNameList: [headDrop.name] });
    }

    myHeadDrops[headDropIndex] = updatedVersionOfHeadDrop;
    await chrome.storage.local.set({ myHeadDrops });
    // setMyHeadDrops(myHeadDrops);

    await chrome.storage.local.set({ isFelixActive: true });
    closeHeadDropSelectorModal();

    setIsAvatarReady(false);

    // reload the page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id as any);
    });
  };

  const closeHeadDropSelectorModal = () => {
    setShowImageDialog(!showImageDialog);
  };

  return (
    <div className="head-drop-creator">
      <span className="close-button" onClick={closeHeadDropSelectorModal}>
        x
      </span>
      <Header />
      <div className="setup-page">
        <p className="setup-page-top-description description">{HeadDropCreatorContent.topDescription}</p>
        <div className="boxes">
          {HeadDropCreatorContent.boxes?.map((box) => {
            return (
              <HeadDropCreatorItem
                index={box.id}
                label={box.label}
                existingImage={tempHeadDropFeedPhotos?.[box.id]}
                tempHeadDropFeedPhotos={tempHeadDropFeedPhotos}
                setTempHeadDropFeedPhotos={setTempHeadDropFeedPhotos}
              />
            );
          })}
        </div>
        <p className="setup-page-bottom-description description">{HeadDropCreatorContent.bottomDescription}</p>

        {isSumbitButtonReady && (
          <div className="ready-headdrop-button" onClick={handleReady}>
            <p>Ready Head Drop!</p>
          </div>
        )}

        {isAvatarReady && <Loader />}
      </div>
    </div>
  );
};
