import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import RecommendationRequestEditPage from "main/pages/RecommendationRequests/RecommendationRequestEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
//import { extractComponentSectionArray } from "storybook/internal/docs-tools";

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
    useParams: () => ({
      id: 0,
    }),
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("RecommendationRequestEditPage tests", () => {
  describe("when the backend doesn't return data", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock
        .onGet("/api/recommendationrequests", { params: { id: 17 } })
        .timeout();
    });

    const queryClient = new QueryClient();
    test("renders header but table is not present", async () => {
      const restoreConsole = mockConsole();

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <RecommendationRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );
      await screen.findByText("Edit RecommendationRequest");
      expect(
        screen.queryByTestId("RecommendationRequest-explanation"),
      ).not.toBeInTheDocument();
      restoreConsole();
    });
  });

  describe("tests where backend is working normally", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock
        .onGet("/api/recommendationrequests", { params: { id: 0 } })
        .reply(200, recommendationRequestFixtures.oneRecRequest[0]);
      let new_request = {};
      Object.assign(
        new_request,
        recommendationRequestFixtures.oneRecRequest[0],
      );
      new_request.explanation = "I don't know actually";
      axiosMock.onPut("/api/recommendationrequests").reply(200, new_request);
    });

    const queryClient = new QueryClient();

    test("Is populated with the data provided", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <RecommendationRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>,
      );

      await screen.findByTestId("RecommendationRequestForm-id");
      const fixture = recommendationRequestFixtures.oneRecRequest[0];
      let new_request = {};
      Object.assign(new_request, fixture);
      new_request.explanation = "I don't know actually";
      const formFields = {};
      for (let prop in fixture) {
        formFields[prop] = screen.getByTestId(
          "RecommendationRequestForm-" + prop,
        );
        expect(formFields[prop]).toBeInTheDocument();
        expect(formFields[prop]).toHaveValue(String(fixture[prop]));
      }

      const submitButton = screen.getByTestId(
        "RecommendationRequestForm-submit",
      );

      expect(submitButton).toHaveTextContent("Update");
      for (let prop in new_request) {
        fireEvent.change(formFields[prop], {
          target: { value: new_request[prop] },
        });
      }

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockToast).toBeCalled());
      expect(mockToast).toBeCalledWith(
        `RecommendationRequest Updated - id: 0 ` +
          `requesterEmail: prof@ucsb.edu professorEmail: stud@ucsb.edu ` +
          `dateNeeded: 2024-11-21T01:08 dateRequested: 2024-10-30T01:08 ` +
          `explanation: I don't know actually done: true`,
      );

      expect(mockNavigate).toBeCalledWith({ to: "/recommendationrequests" });
      delete new_request.id;
      expect(axiosMock.history.put.length).toBe(1); // times called
      expect(axiosMock.history.put[0].params).toEqual({ id: 0 });
      expect(axiosMock.history.put[0].data).toBe(JSON.stringify(new_request)); // posted object
    });
  });
});
