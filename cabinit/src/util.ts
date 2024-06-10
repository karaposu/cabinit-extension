export const asyncForEach = async (array: any[], callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export async function convertImageToBase64(url: any) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Extract Base64 string, remove the prefix 'data:image/jpeg;base64,'
        const base64String = (reader as any).result.replace(/^data:.+;base64,/, "");
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to Base64:", error);
  }
}

export const updateTargetImage = (payload: {}) => {
  window.parent.postMessage(payload, "*"); // Replace '*' with your extension's origin in production
};

export const updateWidgetImage = (payload: {}) => {
  window.parent.postMessage(payload, "*"); // Replace '*' with your extension's origin in production
};
