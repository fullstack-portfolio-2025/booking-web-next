export const dynamic = "force-dynamic";
import { api } from "@/lib/api";
import type { ServiceList, Health } from "@/types";

export default async function Home() {
  const [health, services] = await Promise.all([
    api<Health>("/health"),
    api<ServiceList>("/services"),
  ]);

  const items = services?.data ?? [];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bookora</h1>
        <span className={`rounded px-2 py-1 text-sm ${health?.status === "ok" ? "bg-green-100" : "bg-red-100"}`}>
          API: {health?.status ?? "unknown"}
        </span>
      </header>

      <section>
        <h2 className="text-lg font-medium mb-2">Services ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No services (mock). Add examples in spec.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3">
            {items.map((s) => (
              <li key={s.id} className="rounded-lg border p-4">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">
                  {s.durationMinutes} min · {s.price.currency} {s.price.amount}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
