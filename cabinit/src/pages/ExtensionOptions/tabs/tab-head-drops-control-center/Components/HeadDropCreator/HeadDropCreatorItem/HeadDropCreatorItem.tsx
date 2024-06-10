import { useState } from "react";
import { ImageSelector } from "../../ImageSelector/ImageSelector";
import { HeadDropCreatorContent } from "../HeadDropCreator/HeadDropCreator.content";
import "./HeadDropCreatorItem.scss";

interface HeadDropCreatorItemProps {
  index: number;
  label: string;
  existingImage: string;
  tempHeadDropFeedPhotos: string[];
  setTempHeadDropFeedPhotos: (tempHeadDropFeedPhotos: string[]) => void;
}

export const HeadDropCreatorItem = (props: HeadDropCreatorItemProps) => {
  const { index, label, existingImage, tempHeadDropFeedPhotos, setTempHeadDropFeedPhotos } = props;
  const [showImageDialog, setShowImageDialog] = useState(false);
  const placeholderImage = HeadDropCreatorContent.boxes[index].placeHolderImg;

  const image = existingImage === undefined ? placeholderImage : existingImage;

  const openImageDialog = () => {
    setShowImageDialog(true);
  };

  return (
    <>
      <div className="head-drop-creator-item" onClick={openImageDialog}>
        <div className="box-context">
          <img src={image} />
        </div>
        <div className="box-label">
          <p>{label}</p>
        </div>
      </div>

      {showImageDialog && (
        <ImageSelector
          id={index}
          thumbnail={placeholderImage}
          setShowImageDialog={setShowImageDialog}
          tempHeadDropFeedPhotos={tempHeadDropFeedPhotos}
          setTempHeadDropFeedPhotos={setTempHeadDropFeedPhotos}
        />
      )}
    </>
  );
};
