import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteGuestsModal } from "./invite-guests-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsSteps } from "./steps/invite-guests-steps";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const [isGuestsInputOpen, setisGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    "goncalojmrosa@gmail.com",
    "john@test.com",
  ]);

  const navigate = useNavigate();

  // TODO: use debounce to prevent multiple calls
  const [fields, setFields] = useState<{
    destination: string;
    ownerName: string;
    ownerEmail: string;
    eventStartAndEndDate?: { from: Date | undefined; to: Date | undefined };
  }>({
    destination: "",
    ownerName: "",
    ownerEmail: "",
    eventStartAndEndDate: undefined,
  });

  console.log(fields);

  function openGuestsInput() {
    setisGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setisGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }
  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;

    if (!email) return;

    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(email: string) {
    setEmailsToInvite(emailsToInvite.filter((e) => e !== email));
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fields.destination) return;
    if (!fields.eventStartAndEndDate?.from || !fields.eventStartAndEndDate.to)
      return;
    if (emailsToInvite.length === 0) return;

    if (!fields.ownerEmail || !fields.ownerName) return;

    const { tripId } = await api.post("/trips", {
      destination: fields.destination,
      starts_at: fields.eventStartAndEndDate?.from,
      ends_at: fields.eventStartAndEndDate?.to,
      emails_to_invite: emailsToInvite,
      owner_name: fields.ownerName,
      owner_email: fields.ownerEmail,
    });

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <p>Convide os seus amigos e planei a sua próxima viagem!</p>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            handleDestinationChange={(event) =>
              setFields({ ...fields, destination: event.target.value })
            }
            handleEventStartAndEndDateChange={(date) =>
              date &&
              setFields({
                ...fields,
                eventStartAndEndDate: {
                  from: date.from,
                  to: date.to,
                },
              })
            }
            eventStartAndEndDate={fields.eventStartAndEndDate}
          />

          {isGuestsInputOpen && (
            <InviteGuestsSteps
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-800">
          Ao planear as suas viagens na plann.er você automaticamente concorda{" "}
          <br />
          com os nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            politica de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          handleOwnerChange={(event) =>
            setFields({ ...fields, ownerName: event.target.value })
          }
          handleOwnerEmailChange={(event) =>
            setFields({ ...fields, ownerEmail: event.target.value })
          }
          currentEventDates={fields.eventStartAndEndDate}
          currrentDestination={fields.destination}
        />
      )}
    </div>
  );
}
