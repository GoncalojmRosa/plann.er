import { Link, Link2, MapPinned, Plus, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getImportantLinks,
  GetLinksResponse,
  postImportantLink,
} from "../../api/routes";
import { Button } from "../../components/button";

export function ImportantLinks() {
  const { tripId } = useParams<{ tripId: string }>();
  const [links, setLinks] = useState<GetLinksResponse[]>([]);

  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  useEffect(() => {
    if (!tripId) return;
    getImportantLinks(tripId).then((links) => {
      setLinks(links);
    });
  }, [tripId]);

  function addNewLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!tripId) return;

    const response = postImportantLink(tripId, {
      title: data.get("name") as string,
      url: data.get("link") as string,
    });
    console.log(response);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href="#"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="size-5 text-zinc-400 shrink-0" />
          </div>
        ))}
      </div>

      {isLinksModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 bg-zinc-900 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2>Adicione Links</h2>
                <button
                  type="button"
                  onClick={() => {
                    setIsLinksModalOpen(false);
                  }}
                >
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Insira um{" "}
                <span className="font-semibold text-zinc-100">Título</span> e{" "}
                <span className="font-semibold text-zinc-100">Url</span> para o
                link que deseja adicionar, preencha os dados abaixo:
              </p>
            </div>
            <form onSubmit={addNewLink} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <MapPinned className="size-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Título do link"
                  name="name"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Link className="size-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Url do link"
                  name="link"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <Button type="submit" variant="primary" size="full">
                Adicionar Link
                <Plus className="size-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      <Button
        variant="secondary"
        size="full"
        onClick={() => {
          setIsLinksModalOpen(true);
        }}
      >
        <Plus className="size-5" />
        Registar novo link
      </Button>
    </div>
  );
}
