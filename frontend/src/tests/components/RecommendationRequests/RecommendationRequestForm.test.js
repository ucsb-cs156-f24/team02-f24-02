import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import RecommendationRequestForm from "main/components/RecommendationRequests/RecommendationRequestForm";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("RecommendationRequestForm tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = [
    "Requester Email",
    "Professor Email",
    "Explanation",
    "Date Requested",
    "Date Needed",
    "Done",
  ];
  const testId = "RecommendationRequestForm";

  test("renders correctly with no initialContents", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RecommendationRequestForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });
  });

  test("renders correctly when passing in initialContents", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RecommendationRequestForm
            initialContents={recommendationRequestFixtures.oneRecRequest[0]}
          />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expect(await screen.findByTestId(`${testId}-id`)).toBeInTheDocument();
    expect(screen.getByText(`Id`)).toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RecommendationRequestForm />
        </Router>
      </QueryClientProvider>,
    );
    expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
    const cancelButton = screen.getByTestId(`${testId}-cancel`);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });

  test("that the correct validations are performed", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RecommendationRequestForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/Create/)).toBeInTheDocument();
    const submitButton = screen.getByText(/Create/);
    fireEvent.click(submitButton);

    await screen.findByText(/Requester Email is required/);
    expect(screen.getByText(/Professor Email is required/)).toBeInTheDocument();
    expect(screen.getByText(/Explanation is required/)).toBeInTheDocument();
    expect(screen.getByText(/Date Needed is required/)).toBeInTheDocument();
    expect(screen.getByText(/Date Requested is required/)).toBeInTheDocument();

    const submit = screen.getByTestId("RecommendationRequestForm-submit");
    const dateRequested = screen.getByTestId(
      "RecommendationRequestForm-dateRequested",
    );
    const dateNeeded = screen.getByTestId(
      "RecommendationRequestForm-dateNeeded",
    );
    fireEvent.change(dateRequested, { target: { value: "December 25, 1983" } });
    fireEvent.change(dateNeeded, { target: { value: "November 21, 2002" } });

    fireEvent.click(submit);
    /*
    const nameInput = screen.getByTestId(`${testId}-`);
    fireEvent.change(nameInput, { target: { value: "a".repeat(31) } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Max length 30 characters/)).toBeInTheDocument();
    });
    */
  });
  test("that testids work", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RecommendationRequestForm />
        </Router>
      </QueryClientProvider>,
    );

    expect(
      screen.getByTestId("RecommendationRequestForm-submit"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("RecommendationRequestForm-dateRequested"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("RecommendationRequestForm-dateNeeded"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("RecommendationRequestForm-explanation"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("RecommendationRequestForm-requesterEmail"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("RecommendationRequestForm-professorEmail"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("RecommendationRequestForm-done"),
    ).toBeInTheDocument();

    /*
    const nameInput = screen.getByTestId(`${testId}-`);
    fireEvent.change(nameInput, { target: { value: "a".repeat(31) } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Max length 30 characters/)).toBeInTheDocument();
    });
    */
  });
});
