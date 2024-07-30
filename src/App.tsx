import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewWord } from "./NewWord";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { WordList } from "./WordList";
import { WordLayout } from "./WordLayout";
import { Word } from "./Word";
import { EditWord } from "./EditWord";

export type Word = {
  id: string;
} & WordData;

export type RawWord = {
  id: string;
} & RawWordData;

export type RawWordData = {
  title: string;
  markdown: string;
  example: string;
  pos: string;
  tagIds: string[];
};

export type WordData = {
  title: string;
  markdown: string;
  example: string;
  pos: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [words, setWords] = useLocalStorage<RawWord[]>("Words", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const wordsWithTags = useMemo(() => {
    return words.map(word => ({
      ...word,
      tags: tags.filter(tag => word.tagIds.includes(tag.id))
    }));
  }, [words, tags]);

  function onCreateWord({ tags, ...data }: WordData) {
    setWords(prevWords => [
      ...prevWords,
      { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
    ]);
  }

  function onUpdateWord(id: string, { tags, ...data }: WordData) {
    setWords(prevWords =>
      prevWords.map(word =>
        word.id === id ? { ...word, ...data, tagIds: tags.map(tag => tag.id) } : word
      )
    );
  }

  function onDeleteWord(id: string) {
    setWords(prevWords =>
      prevWords.filter(word => word.id !== id)
    );
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags =>
      prevTags.map(tag =>
        tag.id === id ? { ...tag, label } : tag
      )
    );
  }

  function deleteTag(id: string) {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <WordList
              words={wordsWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewWord
              onSubmit={onCreateWord}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<WordLayout words={wordsWithTags} />}>
          <Route index element={<Word onDelete={onDeleteWord} />} />
          <Route path="edit" element={
            <EditWord
              onSubmit={onUpdateWord}
              onAddTag={addTag}
              availableTags={tags}
            />
          }/>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
