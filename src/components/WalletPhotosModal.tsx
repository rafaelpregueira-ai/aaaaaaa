import { useRef } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { useUserProfile } from "@/lib/user-profile";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function WalletPhotosModal({ open, onClose }: Props) {
  const { profile, setWalletPhoto } = useUserProfile();

  if (!open) return null;

  const handleFile = (index: number, file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setWalletPhoto(index, String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-4 sticky top-0"
          style={{ backgroundColor: "#0B2C63" }}
        >
          <h2 className="text-white text-lg font-semibold">Fotos da carteira</h2>
          <button onClick={onClose} aria-label="Fechar" className="text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">
            Envie até 4 fotos que serão exibidas no documento de identificação.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {profile.walletPhotos.map((photo, i) => (
              <PhotoSlot
                key={i}
                index={i}
                photo={photo}
                onPick={(f) => handleFile(i, f)}
                onRemove={() => setWalletPhoto(i, null)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full py-3 text-white text-base font-semibold"
            style={{ backgroundColor: "#1351B4" }}
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}

function PhotoSlot({
  index,
  photo,
  onPick,
  onRemove,
}: {
  index: number;
  photo: string | null;
  onPick: (file: File) => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="relative w-full aspect-[3/4] flex items-center justify-center bg-gray-100"
      >
        {photo ? (
          <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-500">
            <Upload size={22} />
            <span className="text-xs">Adicionar</span>
          </div>
        )}
        <span
          className="absolute top-1 left-1 text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
          style={{ backgroundColor: "#1351B4" }}
        >
          {index + 1}
        </span>
      </button>
      <div className="flex items-center justify-between px-2 py-1.5">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="text-xs font-semibold"
          style={{ color: "#1351B4" }}
        >
          {photo ? "Trocar" : "Enviar"}
        </button>
        {photo && (
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-500 hover:text-red-600"
            aria-label="Remover"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
