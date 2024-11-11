import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RestaurantForm({
  initialContents,
  submitAction,
  buttonLabel = "Create",
}) {
  //comment
  // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
  // Note that even this complex regex may still need some tweaks

  // Stryker disable Regex
  const isodate_regex =
    /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
  // Stryker restore Regex

  // Stryker disable all
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialContents || {} });
  // Stryker restore all

  const navigate = useNavigate();

  const testIdPrefix = "RecommendationRequestForm";

  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      {initialContents && (
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="id">Id</Form.Label>
            <Form.Control
              data-testid={testIdPrefix + "-id"}
              id="id"
              type="text"
              {...register("id")}
              value={initialContents.id}
              disabled
            />
          </Form.Group>
        </Col>
      )}
      <Row>
        <Col>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
              <Form.Control
                data-testid={testIdPrefix + "-requesterEmail"}
                id="requesterEmail"
                type="text"
                isInvalid={Boolean(errors.requesterEmail)}
                {...register("requesterEmail", {
                  required: "Requester Email is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.requesterEmail?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="professorEmail">Professor Email</Form.Label>
              <Form.Control
                data-testid={testIdPrefix + "-professorEmail"}
                id="professorEmail"
                type="text"
                isInvalid={Boolean(errors.professorEmail)}
                {...register("professorEmail", {
                  required: "Professor Email is required",
                })}
              />

              <Form.Control.Feedback type="invalid">
                {errors.professorEmail?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
        <Col>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="dateRequested">Date Requested</Form.Label>
              <Form.Control
                data-testid={testIdPrefix + "-dateRequested"}
                id="dateRequested"
                type="datetime-local"
                isInvalid={Boolean(errors.localDateTime)}
                {...register("dateRequested", {
                  required: "Date Requested is required",
                  pattern: isodate_regex,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateRequested?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="dateNeeded">Date Needed</Form.Label>
              <Form.Control
                data-testid={testIdPrefix + "-dateNeeded"}
                id="dateNeeded"
                type="datetime-local"
                isInvalid={Boolean(errors.localDateTime)}
                {...register("dateNeeded", {
                  required: "Date Needed is required",
                  pattern: isodate_regex,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateNeeded?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="explanation">Explanation</Form.Label>
          <Form.Control
            data-testid={testIdPrefix + "-explanation"}
            id="explanation"
            type="text"
            isInvalid={Boolean(errors.explanation)}
            {...register("explanation", {
              required: "Explanation is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.explanation?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="done">Done</Form.Label>

          <Form.Select
            aria-label="Request is done?"
            data-testid={testIdPrefix + "-done"}
            id="done"
            {...register("done")}
          >
            <option key="true" value="true">
              true
            </option>
            <option key="false" value="false">
              false
            </option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Button type="submit" data-testid={testIdPrefix + "-submit"}>
        {buttonLabel}
      </Button>
      <Button
        variant="Secondary"
        onClick={() => navigate(-1)}
        data-testid={testIdPrefix + "-cancel"}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default RestaurantForm;
