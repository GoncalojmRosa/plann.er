import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripGuests, TripGuests } from "../../api/routes";
import { Button } from "../../components/button";

export function Guests() {
  const { tripId } = useParams<{ tripId: string }>();
  const [tripGuests, setTripGuests] = useState<TripGuests[] | undefined>();
  useEffect(() => {
    async function fetchData() {
      if (!tripId) return;
      getTripGuests(tripId).then((part) => {
        setTripGuests(part);
      });
    }
    fetchData();
  }, [tripId]);
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {tripGuests?.map((guest, index) => (
          <div
            key={guest.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {guest.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {guest.email}
              </span>
            </div>
            {guest.is_confirmed ? (
              <CheckCircle2 className="size-5 text-green-400 shrink-0" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}
          </div>
        ))}
      </div>
      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerir convidados
      </Button>
    </div>
  );
}
