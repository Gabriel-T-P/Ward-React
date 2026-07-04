import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // No persistence: registration is simulated -> go straight to the app.
    navigate("/app");
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col bg-card px-7 py-8">
      <Link
        to="/login"
        className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Criar conta</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Leva menos de um minuto.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="name"
          label="Nome"
          placeholder="Seu nome"
          icon={<User size={18} />}
          autoComplete="name"
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="voce@email.com"
          icon={<Mail size={18} />}
          autoComplete="email"
        />
        <Input
          name="password"
          type="password"
          label="Senha"
          placeholder="********"
          icon={<Lock size={18} />}
          autoComplete="new-password"
        />

        <Button type="submit" size="lg" fullWidth className="mt-2">
          Criar conta
        </Button>
      </form>

      <p className="mt-auto pt-8 text-center text-sm text-ink-soft">
        Ja tem conta?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Entrar
        </Link>
      </p>
    </div>
  );
}
