import { Context, createContext, useContext, useState, PropsWithChildren, useLayoutEffect } from "react";
import { Avatar } from "../../../../interfaces/avatar";

export interface HeadDrop {
  name: string;
  previewPhotoBase64: string;
  feedPhotos: string[];
  avatar: Avatar | [];
  isActiveHeadDrop: boolean;
}

interface HeadDropsControlCenterContext {
  favoritedHeadDrops: HeadDrop[];
  favoritedHeadDropNameList: string[];
  myHeadDrops: HeadDrop[];
  setMyHeadDrops: (myHeadDrops: HeadDrop[]) => void;
  friendsHeadDrops: HeadDrop[];
  isDataFetched: boolean;
}

const defaultHeadDropsControlCenterContext: HeadDropsControlCenterContext = {
  favoritedHeadDrops: [],
  favoritedHeadDropNameList: [],
  myHeadDrops: [],
  setMyHeadDrops: () => {},
  friendsHeadDrops: [],
  isDataFetched: false
};

const HeadDropsControlCenterContext: Context<HeadDropsControlCenterContext> = createContext(
  defaultHeadDropsControlCenterContext
);

const useHeadDropsControlCenter = () => useContext(HeadDropsControlCenterContext);

const emptyHeadDrops = (prefix: string): HeadDrop[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    name: `${prefix}${i}`,
    previewPhotoBase64: "",
    feedPhotos: [],
    avatar: [],
    isActiveHeadDrop: false,
  }));
};

const HeadDropsControlCenterProvider = ({ children }: PropsWithChildren<{}>) => {
  const getHeadDropsFromLocalStorage = async (type: string): Promise<HeadDrop[]> => {
    const result = await chrome.storage.local.get([type]);
    return result[type] as HeadDrop[];
  };

  const [myHeadDrops, setMyHeadDrops] = useState<HeadDrop[]>(emptyHeadDrops("myHeadDrop-"));
  const [friendsHeadDrops, setFriendsHeadDrops] = useState<HeadDrop[]>(emptyHeadDrops("friendsHeadDrop-"));
  const [favoritedHeadDrops, setFavoritedHeadDrops] = useState<HeadDrop[]>([]);
  const [favoritedHeadDropNameList, setFavoritedHeadDropList] = useState<string[]>([]);
  // when the all data fetch from local storage set a one state and use it in the context
  const [isDataFetched, setIsDataFetched] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      try {
        const myHeadDropsFromStorage = await getHeadDropsFromLocalStorage("myHeadDrops");
        if (myHeadDropsFromStorage) setMyHeadDrops(myHeadDropsFromStorage);

        const friendsHeadDropsFromStorage = await getHeadDropsFromLocalStorage("friendsHeadDrops");
        if (friendsHeadDropsFromStorage) setFriendsHeadDrops(friendsHeadDropsFromStorage);

        const { favoritedHeadDropNameList } = await chrome.storage.local.get(["favoritedHeadDropNameList"]);
        if (favoritedHeadDropNameList) setFavoritedHeadDropList(favoritedHeadDropNameList);

        const favoritedHeadDropsFromStorage = myHeadDropsFromStorage.filter((headDrop) =>
          favoritedHeadDropNameList.includes(headDrop.name)
        );
        setFavoritedHeadDrops(favoritedHeadDropsFromStorage);
        setIsDataFetched(true);
      } catch (error) {
        console.error("Failed to load head drops:", error);
      }
    })();
  }, []);

  return (
    <HeadDropsControlCenterContext.Provider
      value={{
        favoritedHeadDrops,
        favoritedHeadDropNameList,
        myHeadDrops,
        setMyHeadDrops,
        friendsHeadDrops,
        isDataFetched
      }}
    >
      {children}
    </HeadDropsControlCenterContext.Provider>
  );
};

export {
  HeadDropsControlCenterProvider,
  useHeadDropsControlCenter,
  HeadDropsControlCenterContext,
  defaultHeadDropsControlCenterContext,
};
