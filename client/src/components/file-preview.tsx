import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/image-compression";
import { formatFileSize } from "@/lib/utils";
import type { CompressedFile } from "@/pages/home";

interface FilePreviewProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  onCompress: () => void;
  isCompressing: boolean;
  onCompressedFiles: (files: CompressedFile[]) => void;
  quality: number;
  onProgress: (progress: number) => void;
  onCurrentFile: (filename: string) => void;
  onComplete: () => void;
}

export default function FilePreview({
  files,
  onRemoveFile,
  onCompress,
  isCompressing,
  onCompressedFiles,
  quality,
  onProgress,
  onCurrentFile,
  onComplete
}: FilePreviewProps) {

  const handleCompress = async () => {
    onCompress();
    const compressedFiles: CompressedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      onCurrentFile(file.name);
      
      const progress = ((i + 1) / files.length) * 100;
      onProgress(progress);

      try {
        const compressedFile = await compressImage(file, quality);
        compressedFiles.push({
          file: compressedFile,
          originalSize: file.size,
          compressedSize: compressedFile.size
        });
      } catch (error) {
        console.error('Error compressing file:', file.name, error);
      }
    }

    onCompressedFiles(compressedFiles);
    onComplete();
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-black p-6 mb-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-black mb-4">
          {files.length} Images Selected
        </h3>
        <p className="text-gray-600 mb-6">
          Total size: {formatFileSize(totalSize)}
        </p>
        <Button
          onClick={handleCompress}
          disabled={isCompressing || files.length === 0}
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCompressing ? "Compressing..." : "Compress Images"}
        </Button>
      </div>
    </div>
  );
}
