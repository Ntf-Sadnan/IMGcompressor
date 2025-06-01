import { useState } from "react";
import UploadArea from "@/components/upload-area";
import QualitySelector from "@/components/quality-selector";
import FilePreview from "@/components/file-preview";
import ProgressSection from "@/components/progress-section";
import ResultsSection from "@/components/results-section";

export interface CompressedFile {
  file: File;
  originalSize: number;
  compressedSize: number;
}

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([]);
  const [currentQuality, setCurrentQuality] = useState(0.6);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
    setShowResults(false);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setCompressedFiles([]);
    setIsCompressing(false);
    setCompressionProgress(0);
    setCurrentFile("");
    setShowResults(false);
  };

  const totalOriginalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
  const totalCompressedSize = compressedFiles.reduce((sum, item) => sum + item.compressedSize, 0);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-black border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">IMGcompressor</h1>
            <p className="text-gray-300 text-sm">
              Created by <span className="font-semibold text-white">Ntf Sadnan</span>
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Upload Area */}
        <UploadArea onFilesSelected={handleFilesSelected} />

        {/* Quality Selector */}
        <QualitySelector
          currentQuality={currentQuality}
          onQualityChange={setCurrentQuality}
        />

        {/* File Preview */}
        {selectedFiles.length > 0 && (
          <FilePreview
            files={selectedFiles}
            onRemoveFile={handleRemoveFile}
            onCompress={() => {
              setIsCompressing(true);
              setShowResults(false);
            }}
            isCompressing={isCompressing}
            onCompressedFiles={setCompressedFiles}
            quality={currentQuality}
            onProgress={setCompressionProgress}
            onCurrentFile={setCurrentFile}
            onComplete={() => {
              setIsCompressing(false);
              setShowResults(true);
            }}
          />
        )}

        {/* Progress Section */}
        {isCompressing && (
          <ProgressSection
            progress={compressionProgress}
            currentFile={currentFile}
          />
        )}

        {/* Results Section */}
        {showResults && (
          <ResultsSection
            compressedFiles={compressedFiles}
            originalSize={totalOriginalSize}
            compressedSize={totalCompressedSize}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
