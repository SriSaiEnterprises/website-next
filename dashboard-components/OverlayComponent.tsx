import { X } from 'lucide-react';

interface ImageOverlayProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageOverlay = ({ imageUrl, onClose }: ImageOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-full max-h-full">
        <img
          src={imageUrl}
          alt="Enlarged Product"
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};