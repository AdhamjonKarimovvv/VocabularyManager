import { WordData, Tag } from "./App";
import { WordForm } from "./WordForm";

type NewWordProps = {
  onSubmit: (data: WordData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewWord({ onSubmit, onAddTag, availableTags }: NewWordProps) {
  return (
    <>
      <h1 className="mb-4">New Word</h1>
      <WordForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
