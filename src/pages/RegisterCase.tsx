import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Screen } from "../components/layout/Screen";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import type { Disease } from "../types";
import diseasesData from "../data/diseases.json";

const diseases = diseasesData as Disease[];

export function RegisterCase() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

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
            <h2 className="text-xl font-bold text-ink">Registro recebido</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-ink-soft">
              Obrigado por contribuir. Nesta versao os dados sao apenas
              simulados e nao sao salvos.
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <Button fullWidth onClick={() => navigate("/app")}>
              Voltar ao mapa
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setSubmitted(false)}
            >
              Registrar outro caso
            </Button>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen
      title="Registrar caso"
      subtitle="Ajude a mapear doencas na sua regiao."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="disease"
            className="px-1 text-xs font-medium text-ink-soft"
          >
            Doenca
          </label>
          <select
            id="disease"
            name="disease"
            defaultValue=""
            required
            className="h-12 w-full rounded-2xl border border-line bg-card px-4 text-sm text-ink outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
          >
            <option value="" disabled>
              Selecione a doenca
            </option>
            {diseases.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Outra">Outra</option>
          </select>
        </div>

        <Input name="date" type="date" label="Data" required />
        <Input name="city" label="Cidade" placeholder="Sua cidade" required />
        <Input
          name="neighborhood"
          label="Bairro"
          placeholder="Seu bairro"
          required
        />

        <label className="flex items-center gap-3 rounded-2xl bg-card p-4 text-sm text-ink shadow-sm">
          <input
            type="checkbox"
            name="confirmed"
            className="h-5 w-5 shrink-0 accent-primary"
          />
          Confirmado por profissional de saude
        </label>

        <Button type="submit" size="lg" fullWidth className="mt-2">
          Enviar registro
        </Button>
      </form>
    </Screen>
  );
}
