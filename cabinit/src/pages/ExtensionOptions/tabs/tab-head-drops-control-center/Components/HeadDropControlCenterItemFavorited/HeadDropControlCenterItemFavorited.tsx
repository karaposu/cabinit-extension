import { useState } from "react";
import { HeadDrop } from "../../HeadDropsControlCenter.context";
import { HeadDropCreator } from "../HeadDropCreator/HeadDropCreator/HeadDropCreator";
import "./HeadDropControlCenterItemFavorited.scss";
import cn from "classnames";
import useHeadDropItemOperations from "../../Hooks/useHeadDropItemOperations";

interface HeadDropControlCenterItemFavoritedProps {
  headDrop: HeadDrop;
  index: number;
}

export const HeadDropControlCenterItemFavorited = ({ headDrop, index }: HeadDropControlCenterItemFavoritedProps) => {
  const [showHeadDropSelectorModal, setShowHeadDropSelectorModal] = useState(false);
  const { toggleActiveHeadDrop, removeFromFavoritedHeadDrop, hasOnlyOneFavoritedHeadDropExist } =
    useHeadDropItemOperations();

  const isShowRemoveFavoriteButton = !hasOnlyOneFavoritedHeadDropExist();
  const isToggleActiveHeadDropButtonDisabled = hasOnlyOneFavoritedHeadDropExist();

  return (
    <>
      <div className={cn("head-drop-control-center-item-selected")}>
        <div
          className={cn("box", {
            "is-active-head-drop": headDrop.isActiveHeadDrop,
          })}
        >
          {headDrop.previewPhotoBase64 && <img src={headDrop.previewPhotoBase64} alt={headDrop.name} />}
        </div>

        <div className="action-buttons">
          {isShowRemoveFavoriteButton && (
            <span className="remove-from-favorited selector" onClick={() => removeFromFavoritedHeadDrop(headDrop)}>
              {headDrop.previewPhotoBase64 && <p>{"-"}</p>}
            </span>
          )}
          <span
            className={cn("toggle-active-headdrop selector", {
              active: headDrop.isActiveHeadDrop,
              passive: isToggleActiveHeadDropButtonDisabled,
            })}
            onClick={() => toggleActiveHeadDrop(headDrop)}
          >
            {headDrop.previewPhotoBase64 && <p>{"👑"}</p>}
          </span>
        </div>
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
