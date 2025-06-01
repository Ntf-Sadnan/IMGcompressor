import { Button } from "@/components/ui/button";

interface QualitySelectorProps {
  currentQuality: number;
  onQualityChange: (quality: number) => void;
}

export default function QualitySelector({ currentQuality, onQualityChange }: QualitySelectorProps) {
  const qualityOptions = [
    { label: "Lowest Quality", value: 0.6 },
    { label: "High Quality", value: 0.9 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-black p-6 mb-8">
      <h3 className="text-lg font-semibold text-black mb-4">Output Quality</h3>
      <div className="flex space-x-4">
        {qualityOptions.map((option) => (
          <Button
            key={option.value}
            onClick={() => onQualityChange(option.value)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentQuality === option.value
                ? "bg-black text-white"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-3">
        Highest quality options result in larger file sizes. Lowest quality options result in smaller file sizes.
      </p>
    </div>
  );
}
