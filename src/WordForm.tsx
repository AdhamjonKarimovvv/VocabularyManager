import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { WordData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type WordFormProps = {
  onSubmit: (data: WordData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<WordData>;

export function WordForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  example = "",
  pos = "",
  tags = [],
}: WordFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const exampleRef = useRef<HTMLTextAreaElement>(null);
  const posRef = useRef<HTMLSelectElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      example: exampleRef.current!.value,
      pos: posRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="pos">
              <Form.Label>POS</Form.Label>
              <Form.Select ref={posRef} defaultValue={pos}>
                <option value="">Select POS</option>
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
                <option value="pronoun">Pronoun</option>
                <option value="preposition">Preposition</option>
                <option value="conjunction">Conjunction</option>
                <option value="interjection">Interjection</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Meaning</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as="textarea"
            ref={markdownRef}
            rows={5}
          />
        </Form.Group>
        <Form.Group controlId="example">
          <Form.Label>Example</Form.Label>
          <Form.Control
            defaultValue={example}
            required
            as="textarea"
            ref={exampleRef}
            rows={3}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
