import { WordData, Tag } from "./App";
import { WordForm } from "./WordForm";
import { useWord } from "./WordLayout";

type EditWordProps = {
  onSubmit: (id: string, data: WordData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditWord({ onSubmit, onAddTag, availableTags }: EditWordProps) {
  const word = useWord();
  return (
    <>
      <h1 className="mb-4">Edit Word</h1>
      <WordForm
        title={word.title}
        markdown={word.markdown}
        example={word.example}
        pos={word.pos}
        tags={word.tags}
        onSubmit={(data) => onSubmit(word.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
