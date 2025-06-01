export function compressImage(file: File, quality: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image to canvas
      ctx.drawImage(img, 0, 0);

      // Convert to blob with specified quality
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not compress image'));
            return;
          }

          // Create new file with same name and type
          const compressedFile = new File([blob], file.name, {
            type: 'image/webp', // Use WebP for better compression
            lastModified: Date.now()
          });

          resolve(compressedFile);
        },
        'image/webp', // WebP format for better compression
        quality
      );

      // Clean up
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Could not load image'));
      URL.revokeObjectURL(img.src);
    };

    // Load image
    img.src = URL.createObjectURL(file);
  });
}
