import { HeadDrop, useHeadDropsControlCenter } from "../HeadDropsControlCenter.context";

interface HeadDropItemOperations {
  toggleActiveHeadDrop: (headDrop: HeadDrop) => void;
  removeFromFavoritedHeadDrop: (headDrop: HeadDrop) => void;
  hasOnlyOneFavoritedHeadDropExist: () => boolean;
  resetHeadDropContext: () => void;
}

const useHeadDropItemOperations = (): HeadDropItemOperations => {
  const { myHeadDrops, favoritedHeadDropNameList } = useHeadDropsControlCenter();

  const hasOnlyOneFavoritedHeadDropExist = () => {
    return favoritedHeadDropNameList.length === 1;
  };

  const saveToLocalStorage = (key: string, value: any) => {
    chrome.storage.local.set({ [key]: value });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const removeFromFavoritedHeadDrop = async (headDrop: HeadDrop) => {
    const updatedFavoritedList = favoritedHeadDropNameList.filter((item) => item !== headDrop.name);

    saveToLocalStorage("favoritedHeadDropNameList", updatedFavoritedList);

    if (headDrop.isActiveHeadDrop) {
      toggleActiveHeadDrop(headDrop);

      const updatedHeadDrops = myHeadDrops.map((item) => ({
        ...item,
        isActiveHeadDrop: false,
      }));
      updatedHeadDrops[0].isActiveHeadDrop = true;

      saveToLocalStorage("myHeadDrops", updatedHeadDrops);
      reloadPage();
    } else {
      reloadPage();
    }
  };

  const toggleActiveHeadDrop = async (headDrop: HeadDrop) => {
    const updatedHeadDrops = myHeadDrops.map((item) => ({
      ...item,
      isActiveHeadDrop: item.name === headDrop.name ? !item.isActiveHeadDrop : false,
    }));

    saveToLocalStorage("myHeadDrops", updatedHeadDrops);
    reloadPage();
  };

  const resetHeadDropContext = () => {
    const emptyHeadDrops = (prefix: string) =>
      Array.from({ length: 5 }, (_, i) => ({
        name: `${prefix}${i}`,
        previewPhotoBase64: "",
        feedPhotos: [],
        avatar: [],
        isActiveHeadDrop: false,
      }));

    chrome.storage.local.set({
      myHeadDrops: emptyHeadDrops("myHeadDrop-"),
    });

    // reset favoritedHeadDropNameList
    chrome.storage.local.set({ favoritedHeadDropNameList: [] });

    window.location.reload();
  };

  return {
    toggleActiveHeadDrop,
    removeFromFavoritedHeadDrop,
    hasOnlyOneFavoritedHeadDropExist,
    resetHeadDropContext,
  };
};

export default useHeadDropItemOperations;
