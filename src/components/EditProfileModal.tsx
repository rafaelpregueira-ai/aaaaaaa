import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";
import { useUserProfile, type UserProfile } from "@/lib/user-profile";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EditProfileModal({ open, onClose }: Props) {
  const { profile, updateProfile, fotoUrl } = useUserProfile();
  const [form, setForm] = useState<UserProfile>(profile);
  const [preview, setPreview] = useState<string>(fotoUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(profile);
      setPreview(fotoUrl);
    }
  }, [open, profile, fotoUrl]);

  if (!open) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setPreview(dataUrl);
      setForm((f) => ({ ...f, foto: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    onClose();
  };

  const set = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 sticky top-0 z-10"
          style={{ backgroundColor: "#0B2C63" }}
        >
          <h2 className="text-white text-lg font-semibold">Editar dados</h2>
          <button onClick={onClose} aria-label="Fechar" className="text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4">
          {/* Foto */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={preview}
                alt="Prévia"
                className="w-28 h-28 rounded-full object-cover ring-2 ring-gray-200"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: "#1351B4" }}
                aria-label="Alterar foto"
              >
                <Camera size={18} className="text-white" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-sm font-semibold"
              style={{ color: "#1351B4" }}
            >
              Alterar foto
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>

          <Field label="Nome" value={form.nome} onChange={(v) => set("nome", v)} />
          <Field
            label="Nascimento"
            value={form.nascimento}
            onChange={(v) => set("nascimento", v)}
            placeholder="DD/MM/AAAA"
          />
          <Field
            label="Naturalidade"
            value={form.naturalidade}
            onChange={(v) => set("naturalidade", v)}
          />
          <Field label="Nome da Mãe" value={form.nomeMae} onChange={(v) => set("nomeMae", v)} />
          <Field label="CPF" value={form.cpf} onChange={(v) => set("cpf", v)} />
          <Field
            label="Telefone"
            value={form.telefone}
            onChange={(v) => set("telefone", v)}
            type="tel"
          />
          <Field
            label="E-mail"
            value={form.email}
            onChange={(v) => set("email", v)}
            type="email"
          />
          <Field label="Endereço" value={form.endereco} onChange={(v) => set("endereco", v)} />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full py-3 text-base font-semibold border"
              style={{ borderColor: "#1351B4", color: "#1351B4" }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full py-3 text-white text-base font-semibold"
              style={{ backgroundColor: "#1351B4" }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium" style={{ color: "#1351B4" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base outline-none focus:border-[#1351B4] focus:ring-1 focus:ring-[#1351B4]"
      />
    </label>
  );
}
