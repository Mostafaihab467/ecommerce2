// src/utils/imageUtils.ts

export const resizeImage = (url: string, maxWidth = 500, maxHeight = 500): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous'; // Handle CORS issues

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate the new dimensions while maintaining the aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Ensure the canvas background is transparent
        ctx.clearRect(0, 0, width, height);

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to a blob and resolve with the URL
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedImageUrl = URL.createObjectURL(blob);
              resolve(resizedImageUrl);
            } else {
              reject(new Error('Failed to create image blob'));
            }
          },
          'image/png', // Use PNG to support transparency
          1 // Quality (0-1 range)
        );
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };

    img.onerror = () => {
      reject(new Error('Error loading the image.'));
    };
  });
};
