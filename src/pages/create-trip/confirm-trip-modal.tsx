import { Mail, Plus, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 bg-zinc-900 px-6 shadow-shape space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2>Confirmar criação de viagem</h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para
            <span className="font-semibold text-zinc-100">
              {" "}
              Lisboa, Portugal
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              20 a 30 de Agosto de 2024{" "}
            </span>
            , preencha os seus dados abaixo:
          </p>
        </div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="O seu nome completo"
              name="name"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="O seu email pessoal"
              name="email"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <Button type="submit" variant="primary" size="full">
            Confirmar criação de viagem
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
