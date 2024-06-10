import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import cn from "classnames";
import { Loader } from "../../../../../../common/Loader";
import { Header } from "../../../../../../common/components/Header/Header";
import { ImageSelectorContent } from "./ImageSelector.content";
import "./ImageSelector.scss";

interface ImageSelectorProps {
  id: number;
  thumbnail: string;
  setShowImageDialog: any;
  tempHeadDropFeedPhotos: string[];
  setTempHeadDropFeedPhotos: (tempHeadDropFeedPhotos: string[]) => void;
}

export const ImageSelector = (props: ImageSelectorProps) => {
  const { id, thumbnail, setShowImageDialog, tempHeadDropFeedPhotos, setTempHeadDropFeedPhotos } = props;
  const [capturedPhoto, setCapturedPhoto] = useState<string>();
  const [showLoader, setShowLoader] = useState(false);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 0.666666667,
    facingMode: "user",
    audio: false,
  };

  const webcamRef = useRef(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = (webcamRef as any).current.getScreenshot();
    setCapturedPhoto(imageSrc);
  }, [webcamRef]);

  const retryCapture = () => {
    setCapturedPhoto(undefined);
  };

  const uploadPhoto = async (e: any) => {
    setShowLoader(true);
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      const img = (e.target as any).result;
      setCapturedPhoto(img);
      setShowLoader(false);
      return;
    };

    await setInterval(() => {
      !capturedPhoto && setShowLoader(false);
    }, 1500);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveCapture = () => {
    setShowImageDialog(false);

    // setHeadDropImages({
    //   ...headDropImages,
    //   [id]: capturedPhoto,
    // });

    // tempHeadDropFeedPhotos[id] = capturedPhoto as string;
    // setTempHeadDropFeedPhotos(tempHeadDropFeedPhotos);

    setTempHeadDropFeedPhotos({
      ...tempHeadDropFeedPhotos,
      [id]: capturedPhoto as string,
    });
  };

  return (
    <>
      <div className="image-selector">
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="image-dialog">
          <div className="description-area">
            <div className="texts">
              <p className="title">{ImageSelectorContent.title}</p>
              <p className="desc">{ImageSelectorContent.description}</p>
            </div>

            <img className="example-image" src={thumbnail} alt="thumnail-image" />
          </div>

          <div className="image-area">
            <div className="webcam-preview-wrapper">
              {capturedPhoto ? (
                <img src={capturedPhoto}></img>
              ) : (
                <div className="webcam-preview">
                  {showLoader ? (
                    <Loader />
                  ) : (
                    <Webcam audio={false} videoConstraints={videoConstraints} ref={webcamRef} mirrored />
                  )}
                </div>
              )}
            </div>

            <div className="buttons">
              <div className="top">
                {!capturedPhoto ? (
                  <button className="button" onClick={capturePhoto}>
                    Capture the Image!
                  </button>
                ) : (
                  <button className="button button-retry" onClick={retryCapture}>
                    Retry!
                  </button>
                )}

                <label className="button" onClick={retryCapture}>
                  Upload Photo
                  <input
                    type="file"
                    className="button"
                    onClick={uploadPhoto}
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => uploadPhoto(e)}
                    onBlur={() => setShowLoader(false)}
                  />
                </label>
              </div>

              <button className={cn("button button-ready", !capturedPhoto && "disabled")} onClick={saveCapture}>
                Ready!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop" onClick={() => setShowImageDialog(false)} />
    </>
  );
};
