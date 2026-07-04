import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Navigation } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { PremiumGate } from "../components/premium/PremiumGate";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import type { Disease } from "../types";
import diseasesData from "../data/diseases.json";

const vaccineOptions = Array.from(
  new Set(
    (diseasesData as Disease[])
      .map((d) => d.vaccineName)
      .filter((name): name is string => Boolean(name)),
  ),
);

export function RegisterVaccine() {
  return (
    <PremiumGate
      title="Vacinas Premium"
      description="Registre suas vacinas e acompanhe a validade."
    >
      <RegisterVaccineForm />
    </PremiumGate>
  );
}

function RegisterVaccineForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [vaccine, setVaccine] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Decorative only: nothing is persisted.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Screen>
        <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center [animation:ward-fade-in_300ms_ease-out]">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 size={32} />
          </span>
          <div>
            <h2 className="text-xl font-bold text-ink">Vacina registrada</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">
              Nesta versao os dados sao apenas simulados e nao sao salvos.
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-2">
            {vaccine && (
              <Button
                fullWidth
                onClick={() =>
                  navigate(`/app?vacina=${encodeURIComponent(vaccine)}`)
                }
              >
                <Navigation size={18} />
                Onde tomar
              </Button>
            )}
            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate("/app/vacinas")}
            >
              Voltar para vacinas
            </Button>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen
      title="Registrar vacina"
      subtitle="Guarde suas vacinas e saiba quando revacinar."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="vaccine"
            className="px-1 text-xs font-medium text-ink-soft"
          >
            Vacina
          </label>
          <select
            id="vaccine"
            name="vaccine"
            value={vaccine}
            onChange={(e) => setVaccine(e.target.value)}
            required
            className="h-12 w-full rounded-2xl border border-line bg-card px-4 text-sm text-ink outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
          >
            <option value="" disabled>
              Selecione a vacina
            </option>
            {vaccineOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <Input name="takenAt" type="date" label="Data de aplicacao" required />
        <Input
          name="expiresAt"
          type="date"
          label="Validade (proxima dose)"
          required
        />

        <Button type="submit" size="lg" fullWidth className="mt-2">
          Salvar vacina
        </Button>
      </form>
    </Screen>
  );
}
