import { useEffect, useState } from "react";
import { HeadDrop, useHeadDropsControlCenter } from "../../HeadDropsControlCenter.context";
import { HeadDropCreator } from "../HeadDropCreator/HeadDropCreator/HeadDropCreator";
import "./HeadDropControlCenterItem.scss";

interface HeadDropControlCenterItemProps {
  headDrop: HeadDrop;
  type: "myHeadDrops" | "friendsHeadDrops";
  index: number;
}

export const HeadDropControlCenterItem = ({ headDrop, type, index }: HeadDropControlCenterItemProps) => {
  const [showHeadDropSelectorModal, setShowHeadDropSelectorModal] = useState(false);
  const { myHeadDrops, favoritedHeadDropNameList, isDataFetched } = useHeadDropsControlCenter();

  const handleOpenImageDialog = () => {
    setShowHeadDropSelectorModal(true);
  };

  const saveToLocalStorage = (key: string, value: any) => {
    chrome.storage.local.set({ [key]: value });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const removeHeadDrop = async () => {
    const updatedFavoritedList = favoritedHeadDropNameList.filter((item) => item !== headDrop.name);
    saveToLocalStorage("favoritedHeadDropNameList", updatedFavoritedList);

    const updatedHeadDrops = myHeadDrops.map((item, idx) =>
      idx === index ? { ...item, previewPhotoBase64: "", feedPhotos: [], avatar: [], isActiveHeadDrop: false } : item
    );

    if (headDrop.isActiveHeadDrop) {
      const updatedActiveHeadDrops = updatedHeadDrops.map((item) => ({
        ...item,
        isActiveHeadDrop: false,
      }));
      updatedActiveHeadDrops[0].isActiveHeadDrop = true;
      saveToLocalStorage("myHeadDrops", updatedActiveHeadDrops);
    } else {
      saveToLocalStorage("myHeadDrops", updatedHeadDrops);
    }

    reloadPage();
  };

  const addToFavoriteHeadDrop = (headDropName: string) => {
    chrome.storage.local.get(["favoritedHeadDropNameList"], (result) => {
      const favoritedHeadDropNameList = result.favoritedHeadDropNameList || [];
      if (!favoritedHeadDropNameList.includes(headDropName)) {
        favoritedHeadDropNameList.push(headDropName);
        saveToLocalStorage("favoritedHeadDropNameList", favoritedHeadDropNameList);
        reloadPage();
      }
    });
  };

  const hasShowAddToFavoriteButton = type === "myHeadDrops" && !favoritedHeadDropNameList.includes(headDrop.name);

  // if all myHeadDrops are empty, open showHeadDropSelectorModal to create a new headDrop inital render and open only for myHeadDrop-0
  const openHeadDropSelectorModalWhenAllHeadDropsAreEmpty = () => {
    if (isDataFetched && myHeadDrops?.every((item) => item.previewPhotoBase64 === "") && index === 0) {
      setShowHeadDropSelectorModal(true);
    }
  };

  useEffect(() => {
    openHeadDropSelectorModalWhenAllHeadDropsAreEmpty();
  }, [myHeadDrops, isDataFetched]);

  return (
    <>
      <div className="head-drop-control-center-item">
        {headDrop.previewPhotoBase64 && (
          <div className="delete-button" onClick={removeHeadDrop}>
            <button>X</button>
          </div>
        )}

        <div className="box" onClick={handleOpenImageDialog}>
          {headDrop.previewPhotoBase64 && <img src={headDrop.previewPhotoBase64} alt={headDrop.name} />}
        </div>

        <span className="add-to-favorite-button selector" onClick={() => addToFavoriteHeadDrop(headDrop.name)}>
          {headDrop.previewPhotoBase64 && <>{hasShowAddToFavoriteButton && <p>+</p>}</>}
        </span>
      </div>

      {showHeadDropSelectorModal && (
        <HeadDropCreator
          headDrop={headDrop}
          headDropIndex={index}
          showImageDialog={showHeadDropSelectorModal}
          setShowImageDialog={setShowHeadDropSelectorModal}
        />
      )}
    </>
  );
};
