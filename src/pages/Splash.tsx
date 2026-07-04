import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WardLogo } from "../components/brand/WardLogo";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <button
      onClick={() => navigate("/login")}
      className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center gap-6 bg-card"
    >
      <div className="[animation:ward-fade-in_600ms_ease-out]">
        <WardLogo className="h-28 w-28 text-primary" />
      </div>
      <div className="text-center [animation:ward-fade-in_800ms_ease-out]">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink">Ward</h1>
        <p className="mt-2 text-sm font-medium text-ink-soft">
          Sua sentinela pessoal.
        </p>
      </div>
    </button>
  );
}
