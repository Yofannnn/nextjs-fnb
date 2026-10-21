import { useEffect, useState } from "react";
import { useSession } from "@/stores/session.store";

export function useSessionHydrated() {
  const [hydrated, setHydrated] = useState(() => useSession.persist?.hasHydrated() ?? false);

  useEffect(() => {
    if (!useSession.persist) return;

    const unsubscribe = useSession.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsubscribe;
  }, []);

  return hydrated;
}
