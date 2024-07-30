import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useWord } from "./WordLayout";
import ReactMarkdown from "react-markdown";

type WordProps = {
  onDelete: (id: string) => void;
};

export function Word({ onDelete }: WordProps) {
  const word = useWord();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{word.title}</h1>
          {word.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {word.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${word.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(word.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{word.markdown}</ReactMarkdown>
      <h5>Example:</h5>
      <p>{word.example}</p>
      <h5>POS:</h5>
      <p>{word.pos}</p>
    </>
  );
}
