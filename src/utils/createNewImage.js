export const createNewImageFile = async (croppedImageUrl) => {
  try {
    if (croppedImageUrl) {
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "croppedImage.png", {
        type: "image/png",
      });
      return file;
    } else {
      return { message: "Image url required" };
    }
  } catch (error) {
    console.log({ error: error.message, message: "Failed to create image" });
  }
};
