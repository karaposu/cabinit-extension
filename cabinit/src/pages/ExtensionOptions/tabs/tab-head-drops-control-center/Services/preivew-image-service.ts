import axios from "axios";
import { Avatar } from "../../../../../interfaces/avatar";
import { BACKEND_URL } from "../../../../../configs/configs";

export const getAvatar = async (headDropImage: string): Promise<Avatar | []> => {
  const apiUrl = `${BACKEND_URL}/MAN_USR_IMAGE/`;
  const userImageBase64 = headDropImage?.replace("data:image/webp;base64,", "");
  const requestData = {
    data: { user_image: userImageBase64 },
    config: { return_img_format: "encoded" },
    operation: {
      userid: "asdasd",
      package_sent_time: "string",
      counter: 0,
      link: "https://www.reddit.com/",
      operation_name: "headextraction",
    },
  };

  try {
    const { data } = await axios.post(apiUrl, requestData, {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });

    const parsedData = JSON.parse(data.data);

    // Assuming 'parsedData' contains all necessary fields directly under 'images' and additional fields
    // for FD_coordinates, LM_coordinates, skincolor, and total_time as demonstrated below.
    // You might need to adjust the mapping based on the actual response structure.

    return {
      images: {
        head: `data:image/webp;base64,${parsedData.images.head}`,
        headselection_mask: `data:image/webp;base64,${parsedData.images.headselection_mask}`,
        head_transparent: `data:image/webp;base64,${parsedData.images.head_transparent}`,
      },
      FD_coordinates: parsedData.FD_coordinates,
      LM_coordinates: parsedData.LM_coordinates,
      skincolor: parsedData.skincolor,
      total_time: parsedData.total_time,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};
