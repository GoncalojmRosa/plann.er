import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrip, Trip } from "../../api/routes";
import { format } from "date-fns";

export function DestinationAndDateHeader() {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<Trip | undefined>();
  useEffect(() => {
    async function fetchData() {
      if (!tripId) return;
      getTrip(tripId).then((trip) => {
        setTrip(trip);
      });
    }
    fetchData();
  }, [tripId]);

  const tripDate =
    trip && trip.starts_at && trip.ends_at
      ? format(trip.starts_at, "d' de 'LLL")
          .concat(" até ")
          .concat(format(trip.ends_at, "d' de 'LLL"))
      : "";

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{tripDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-600" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
