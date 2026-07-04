import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { WardLogo } from "../components/brand/WardLogo";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center bg-card px-7">
      <header className="mb-10 flex flex-col items-center text-center">
        <WardLogo className="h-16 w-16 text-primary" />
        <h1 className="mt-4 text-2xl font-bold text-ink">Bem vindo de volta</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Entre para acompanhar sua saude.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          autoComplete="current-password"
        />

        <Button type="submit" size="lg" fullWidth className="mt-2">
          Entrar
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-soft">
        Ainda nao tem conta?{" "}
        <Link to="/register" className="font-semibold text-primary">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
