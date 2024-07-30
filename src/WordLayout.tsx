import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Word } from "./App";

type WordLayoutProps = {
  words: Word[];
}

export function WordLayout({ words }: WordLayoutProps) {
  const { id } = useParams();
  
  const word = words.find((n: Word) => n.id === id);

  if (word == null) return <Navigate to="/" replace />

  return <Outlet context={word} />;
}

export function useWord() {
  return useOutletContext<Word>();
}
