import { createContext, useEffect, useState } from "react";

type TActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

export default function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  const { activeId } = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}

function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      setActiveId(+id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return { activeId };
}
