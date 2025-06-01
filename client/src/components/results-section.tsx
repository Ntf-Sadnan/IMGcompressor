import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";
import JSZip from "jszip";
import type { CompressedFile } from "@/pages/home";

interface ResultsSectionProps {
  compressedFiles: CompressedFile[];
  originalSize: number;
  compressedSize: number;
  onReset: () => void;
}

export default function ResultsSection({
  compressedFiles,
  originalSize,
  compressedSize,
  onReset
}: ResultsSectionProps) {
  const spaceSaved = originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0;

  const handleDownload = async () => {
    const zip = new JSZip();
    
    compressedFiles.forEach(item => {
      zip.file(item.file.name, item.file);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed_images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Clear the queue after download
    setTimeout(() => {
      onReset();
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-black p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-black mb-2">Compression Complete!</h3>
        <div className="text-black mb-6">
          <p>Original size: <span className="font-medium">{formatFileSize(originalSize)}</span></p>
          <p>Compressed size: <span className="font-medium">{formatFileSize(compressedSize)}</span></p>
          <p>Space saved: <span className="font-medium text-black">{spaceSaved.toFixed(1)}%</span></p>
        </div>
        
        <Button
          onClick={handleDownload}
          className="bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-700 transition-colors text-lg mb-4"
        >
          Download as ZIP
        </Button>
        
        <div className="mt-4">
          <button
            onClick={onReset}
            className="text-black hover:text-gray-700 font-medium"
          >
            Compress More Images
          </button>
        </div>
      </div>
    </div>
  );
}
