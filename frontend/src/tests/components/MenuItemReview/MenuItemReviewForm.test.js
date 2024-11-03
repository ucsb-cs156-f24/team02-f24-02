import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("MenuItemReviewForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    await screen.findByText(/Item ID/);
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a MenuItemReview", async () => {
    const initialContents = {
      id: 1,
      itemId: 101,
      reviewerEmail: "test@example.com",
      stars: 5,
      dateReviewed: "2022-01-02T12:00",
      comments: "Great item!",
    };

    render(
      <Router>
        <MenuItemReviewForm initialContents={initialContents} />
      </Router>
    );
    await screen.findByTestId("MenuItemReviewForm-id");
    expect(screen.getByTestId("MenuItemReviewForm-id")).toHaveValue("1");
    expect(screen.getByTestId("MenuItemReviewForm-itemId")).toHaveValue(101);
  });

  test("Correct Error messages on bad input", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    await screen.findByTestId("MenuItemReviewForm-itemId");
  
    const itemIdField = screen.getByTestId("MenuItemReviewForm-itemId");
    const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
    const starsField = screen.getByTestId("MenuItemReviewForm-stars");
    const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
    const submitButton = screen.getByTestId("MenuItemReviewForm-submit");
  
    fireEvent.change(itemIdField, { target: { value: "-1" } });
    fireEvent.change(reviewerEmailField, { target: { value: "not-an-email" } });
    fireEvent.change(starsField, { target: { value: "6" } });
    fireEvent.change(dateReviewedField, { target: { value: "bad-date" } });
    fireEvent.click(submitButton);
  
    await screen.findByText(/Item ID must be a positive number/);
    expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument();
    expect(screen.getByText(/Maximum rating is 5/)).toBeInTheDocument();
    expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument(); // Update this line
  });
  

  test("Correct Error messages on missing input", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

    fireEvent.click(submitButton);

    await screen.findByText(/Item ID is required/);
    expect(screen.getByText(/Reviewer Email is required/)).toBeInTheDocument();
    expect(screen.getByText(/Star rating is required/)).toBeInTheDocument();
    expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
    expect(screen.getByText(/Comments are required/)).toBeInTheDocument();
  });

  test("No Error messages on good input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <MenuItemReviewForm submitAction={mockSubmitAction} />
      </Router>
    );
    await screen.findByTestId("MenuItemReviewForm-itemId");

    const itemIdField = screen.getByTestId("MenuItemReviewForm-itemId");
    const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
    const starsField = screen.getByTestId("MenuItemReviewForm-stars");
    const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
    const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
    const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

    fireEvent.change(itemIdField, { target: { value: "101" } });
    fireEvent.change(reviewerEmailField, { target: { value: "test@example.com" } });
    fireEvent.change(starsField, { target: { value: "5" } });
    fireEvent.change(dateReviewedField, { target: { value: "2022-01-02T12:00" } });
    fireEvent.change(commentsField, { target: { value: "Great item!" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(screen.queryByText(/Item ID must be a positive number/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please enter a valid email address/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Maximum rating is 5/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Date Reviewed must be in ISO format/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Comments are required/)).not.toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <Router>
        <MenuItemReviewForm />
      </Router>
    );
    await screen.findByTestId("MenuItemReviewForm-cancel");
    const cancelButton = screen.getByTestId("MenuItemReviewForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});