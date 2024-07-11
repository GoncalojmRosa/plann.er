import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivities, GetActivitiesResponse } from "../../api/routes";
import { format } from "date-fns";

export function Activities() {
  const { tripId } = useParams<{ tripId: string }>();
  const [activities, setActivities] = useState<GetActivitiesResponse[]>([]);
  useEffect(() => {
    if (!tripId) return;
    getActivities(tripId).then((activities) => {
      setActivities(activities);
    });
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(activity.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(activity.date, "EEEE")}
              </span>
            </div>
            {activity.activities ? (
              activity.activities.map((activity) => (
                <div className="spacey2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(new Date(activity.occurs_at), "HH:mm")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade registada nesta data
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
