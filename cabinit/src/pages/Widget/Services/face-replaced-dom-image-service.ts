import axios from "axios";
import { Avatar } from "../../../interfaces/avatar";
import { BACKEND_URL } from "../../../configs/configs";

interface GetFaceReplacedDomImage {
  targetImage: string;
  avatar: Avatar;
}

export const getFaceReplacedDomImage = async ({ targetImage, avatar }: GetFaceReplacedDomImage): Promise<any> => {
  const apiUrl = `${BACKEND_URL}/MAN_DOM_IMAGE/`;

  const requestData = {
    data: {
      source_headswapObjs: [
        {
          head_img: avatar.images.head?.replace("data:image/webp;base64,", ""),
          headselection_mask: avatar.images.headselection_mask?.replace("data:image/webp;base64,", ""),
          FD_coordinates: avatar.FD_coordinates,
          LM_coordinates: avatar.LM_coordinates,
          skincolor: avatar.skincolor,
          total_time: avatar.total_time,
        },
        // Kalanlar aynı seyı paslıyor, paslamazsa akamıyor
        {
          head_img: avatar.images.head?.replace("data:image/webp;base64,", ""),
          headselection_mask: avatar.images.headselection_mask?.replace("data:image/webp;base64,", ""),
          FD_coordinates: avatar.FD_coordinates,
          LM_coordinates: avatar.LM_coordinates,
          skincolor: avatar.skincolor,
          total_time: avatar.total_time,
        },
        {
          head_img: avatar.images.head?.replace("data:image/webp;base64,", ""),
          headselection_mask: avatar.images.headselection_mask?.replace("data:image/webp;base64,", ""),
          FD_coordinates: avatar.FD_coordinates,
          LM_coordinates: avatar.LM_coordinates,
          skincolor: avatar.skincolor,
          total_time: avatar.total_time,
        },
      ],
      target_image: targetImage,
    },
    config: {
      ASD: {
        skincolortransfer: 0,
        headorientation: 0,
        hairtransfer: 0,
        generic_setting1: 0,
        generic_setting2: 0,
      },
      return_img_format: "encoded",
    },
    operation: {
      userid: "user1234",
      package_sent_time: "2024-03-06T12:00:00Z",
      counter: 1,
      link: "https://api.example.com/operations/1234",
      operation_name: "headswap",
    },
  };

  // // read advanceSettings from chrome storage
  // const advanceSettings = await new Promise((resolve) => {
  //   chrome.storage.local.get(["advanceSettings"], function (result) {
  //     resolve(result.advanceSettings);
  //   });

  try {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.innerHTML = `<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading..." />`;
    // make the spinner fixed to the center of the screen over all elements cover the whole screen
    spinner.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
    `;

    // and add a  message to the spinner to show the user that the image is being processed
    const message = document.createElement("p");
    message.innerText = "Processing image...";
    message.style.cssText = `
      color: white;
      font-size: 24px;
    `;
    spinner.appendChild(message);

    document.body.appendChild(spinner);

    const { data } = await axios.post(apiUrl, requestData, {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });

    const parsedData = JSON.parse(data.data) as MAN_DOM_IMAGE_PARSED_DATA_RESPONSE;

    // remove loading spinner from dom
    spinner.remove();
    message.remove();

    return {
      faceReplacedDomImage: `data:image/webp;base64, ${parsedData.images[0].result}`,
      // total_time: parsedData.total_time,
    };
  } catch (error) {
    console.error(error);

    // @ts-ignore
    spinner.remove();
    console.error("Error fetching data:", error);
    return [];
  }
};

// interface MAN_DOM_IMAGE_RESPONSE {
//   data: string;
//   operation: {
//     debug_log: string;
//     error_code: string;
//     extra_field: {
//       all_total_duration: number;
//       request_json_read: number;
//     };
//     package_sent_time: string;
//     success: boolean;
//   };
// }

interface MAN_DOM_IMAGE_PARSED_DATA_RESPONSE {
  images: { result: string }[];
  total_time: {
    Total_ImgOp_Time: number;
    source_heads_creation: number;
    decoding_target_img: number;
    creating_target_headswapObj: number;
    headswapping: number;
    encoding_result_img: number;
  };
}
