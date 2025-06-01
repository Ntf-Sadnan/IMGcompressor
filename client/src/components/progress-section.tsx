interface ProgressSectionProps {
  progress: number;
  currentFile: string;
}

export default function ProgressSection({ progress, currentFile }: ProgressSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-black p-6 mb-8">
      <h3 className="text-lg font-semibold text-black mb-4">Compression Progress</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-black mb-2">
          <span>Compressing images...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-black h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-600">
          Processing: {currentFile}
        </div>
      </div>
    </div>
  );
}
