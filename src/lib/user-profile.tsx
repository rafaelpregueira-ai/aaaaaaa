import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import defaultAvatar from "@/assets/davi-foto.jpg.asset.json";

export type UserProfile = {
  nome: string;
  nascimento: string;
  naturalidade: string;
  nomeMae: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  /** base64 data URL, or null to use the default asset image */
  foto: string | null;
  /** Up to 4 custom photos used in the ID document carousel (base64 or null) */
  walletPhotos: (string | null)[];
};

const DEFAULT_PROFILE: UserProfile = {
  nome: "DAVI PEDROSO FARIAS",
  nascimento: "21/05/2008",
  naturalidade: "JOINVILLE/SC",
  nomeMae: "ANA CRISTINA OSOWSKI NUNES CAPOZZI",
  cpf: "098.537.919-78",
  telefone: "(47) 99101-1320",
  email: "davi.farias@gmail.com",
  endereco: "Não Informado",
  foto: null,
  walletPhotos: [null, null, null, null],
};

const STORAGE_KEY = "govbr:user-profile";

type Ctx = {
  profile: UserProfile;
  updateProfile: (patch: Partial<UserProfile>) => void;
  setWalletPhoto: (index: number, dataUrl: string | null) => void;
  fotoUrl: string;
  primeiroNome: string;
};

const UserProfileContext = createContext<Ctx | null>(null);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<UserProfile>;
        setProfile((p) => ({
          ...p,
          ...parsed,
          walletPhotos:
            Array.isArray(parsed.walletPhotos) && parsed.walletPhotos.length === 4
              ? parsed.walletPhotos
              : p.walletPhotos,
        }));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore quota */
    }
  }, [profile, hydrated]);

  const updateProfile = (patch: Partial<UserProfile>) =>
    setProfile((p) => ({ ...p, ...patch }));

  const setWalletPhoto = (index: number, dataUrl: string | null) =>
    setProfile((p) => {
      const next = [...p.walletPhotos];
      next[index] = dataUrl;
      return { ...p, walletPhotos: next };
    });

  const fotoUrl = profile.foto ?? defaultAvatar.url;
  const primeiroNome = profile.nome.trim().split(/\s+/)[0] ?? "";

  return (
    <UserProfileContext.Provider
      value={{ profile, updateProfile, setWalletPhoto, fotoUrl, primeiroNome }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error("useUserProfile must be used within UserProfileProvider");
  return ctx;
}
