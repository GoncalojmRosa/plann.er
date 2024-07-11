import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { ChangeEvent, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  handleDestinationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEventStartAndEndDateChange: (event: DateRange | undefined) => void;
  eventStartAndEndDate: DateRange | undefined;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  handleDestinationChange,
  handleEventStartAndEndDateChange,
  eventStartAndEndDate,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatepicker() {
    setIsDatePickerOpen(true);
  }
  function closeDatepicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDate && eventStartAndEndDate.from && eventStartAndEndDate.to
      ? format(eventStartAndEndDate.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDate.to, "d' de 'LLL"))
      : "Quando?";

  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde deseja ir?"
          disabled={isGuestsInputOpen}
          onChange={handleDestinationChange}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <button
        disabled={isGuestsInputOpen}
        onClick={openDatepicker}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400 " />
        <span className="text-lg text-zinc-400 flex-1">{displayedDate}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 bg-zinc-900 px-6 shadow-shape space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2>Selecione a data</h2>
                <button type="button" onClick={closeDatepicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              selected={eventStartAndEndDate}
              onSelect={handleEventStartAndEndDateChange}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-600" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary" size="default">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary" size="default">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
