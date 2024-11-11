import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecommendationRequestCreatePage from "main/pages/RecommendationRequests/RecommendationRequestCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("RecommendationRequestCreatePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  const queryClient = new QueryClient();
  test("renders without crashing", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RecommendationRequestCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Explanation")).toBeInTheDocument();
    });
  });

  test("on submit, makes request to backend, and redirects to /recommendationrequests", async () => {
    const queryClient = new QueryClient();
    const recommendationRequest =
      recommendationRequestFixtures.oneRecRequest[0];

    axiosMock
      .onPost("/api/recommendationrequests/post")
      .reply(202, recommendationRequest);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RecommendationRequestCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Requester Email")).toBeInTheDocument();
    });

    const requesterEmailInput = screen.getByLabelText("Requester Email");
    expect(requesterEmailInput).toBeInTheDocument();

    const professorEmailInput = screen.getByLabelText("Professor Email");
    expect(professorEmailInput).toBeInTheDocument();

    const dateNeededInput = screen.getByLabelText("Date Needed");
    expect(dateNeededInput).toBeInTheDocument();

    const dateRequestedInput = screen.getByLabelText("Date Requested");
    expect(dateRequestedInput).toBeInTheDocument();

    const explanationInput = screen.getByLabelText("Explanation");
    expect(explanationInput).toBeInTheDocument();

    const doneInput = screen.getByLabelText("Done");
    expect(doneInput).toBeInTheDocument();

    const createButton = screen.getByText("Create");
    expect(createButton).toBeInTheDocument();

    const change = (input, prop) =>
      fireEvent.change(input, {
        target: { value: recommendationRequest[prop] },
      });
    change(requesterEmailInput, "requesterEmail");
    change(professorEmailInput, "professorEmail");
    change(dateNeededInput, "dateNeeded");
    change(dateRequestedInput, "dateRequested");
    change(explanationInput, "explanation");
    change(doneInput, "done");

    fireEvent.click(createButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
    let recRequestCopy = {};
    Object.assign(recRequestCopy, recommendationRequest);
    delete recRequestCopy.id;

    expect(axiosMock.history.post[0].params).toEqual(recRequestCopy);

    // assert - check that the toast was called with the expected message
    expect(mockToast).toBeCalledWith(
      `New recommendationRequest Created - id: 0 ` +
        `requesterEmail: prof@ucsb.edu professorEmail: stud@ucsb.edu ` +
        `dateNeeded: 2024-11-21T01:08 dateRequested: 2024-10-30T01:08 ` +
        `explanation: I need to get into grad school! done: true`,
    );
    expect(mockNavigate).toBeCalledWith({ to: "/recommendationrequests" });
  });
});
