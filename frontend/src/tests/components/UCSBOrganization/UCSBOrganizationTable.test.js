import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { ucsbOrganizationsFixtures } from "fixtures/ucsbOrganizationFixtures";
import UCSBOrganizationsTable from "main/components/UCSBOrganization/UCSBOrganizationTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("UCSBOrganizationsTable tests", () => {
  const queryClient = new QueryClient();

  const expectedHeaders = [
    "OrgCode",
    "OrgTranslationShort",
    "OrgTranslation",
    "Inactive",
  ];
  const expectedFields = [
    "orgCode",
    "orgTranslationShort",
    "orgTranslation",
    "inactive",
  ];
  const testId = "UCSBOrganizationsTable";

  test("renders empty table correctly", () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationsTable
            UCSBOrganizations={[]}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const fieldElement = screen.queryByTestId(
        `${testId}-cell-row-0-col-${field}`,
      );
      expect(fieldElement).not.toBeInTheDocument();
    });
  });

  test("Has the expected column headers, content and buttons for admin user", () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationsTable
            UCSBOrganizations={ucsbOrganizationsFixtures.threeUCSBOrganizations}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgCode`),
    ).toHaveTextContent("ACM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`),
    ).toHaveTextContent("UCSB ACM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgTranslation`),
    ).toHaveTextContent("UCSB ASSOCIATION FOR COMPUTING MACHINERY");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-inactive`),
    ).toHaveTextContent("false");

    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-orgCode`),
    ).toHaveTextContent("IEEE");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-orgTranslationShort`),
    ).toHaveTextContent("UCSB IEEE");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-orgTranslation`),
    ).toHaveTextContent(
      "UCSB INSTITUTE OF ELECTRICAL AND ELECTRONICS ENGINEERS",
    );
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-inactive`),
    ).toHaveTextContent("false");

    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-orgCode`),
    ).toHaveTextContent("LI");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-orgTranslationShort`),
    ).toHaveTextContent("LOS INGENIEROS");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-orgTranslation`),
    ).toHaveTextContent("UCSB LOS INGENIEROS");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-inactive`),
    ).toHaveTextContent("false");

    const editButton = screen.getByTestId(
      `${testId}-cell-row-0-col-Edit-button`,
    );
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(
      `${testId}-cell-row-0-col-Delete-button`,
    );
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");
  });

  test("Has the expected column headers, content for ordinary user", () => {
    // arrange
    const currentUser = currentUserFixtures.userOnly;

    // act
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationsTable
            UCSBOrganizations={ucsbOrganizationsFixtures.threeUCSBOrganizations}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // assert
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgCode`),
    ).toHaveTextContent("ACM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`),
    ).toHaveTextContent("UCSB ACM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgTranslation`),
    ).toHaveTextContent("UCSB ASSOCIATION FOR COMPUTING MACHINERY");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-inactive`),
    ).toHaveTextContent("false");

    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-orgCode`),
    ).toHaveTextContent("IEEE");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-orgTranslationShort`),
    ).toHaveTextContent("UCSB IEEE");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-orgTranslation`),
    ).toHaveTextContent(
      "UCSB INSTITUTE OF ELECTRICAL AND ELECTRONICS ENGINEERS",
    );
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-inactive`),
    ).toHaveTextContent("false");

    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-orgCode`),
    ).toHaveTextContent("LI");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-orgTranslationShort`),
    ).toHaveTextContent("LOS INGENIEROS");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-orgTranslation`),
    ).toHaveTextContent("UCSB LOS INGENIEROS");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-inactive`),
    ).toHaveTextContent("false");

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  test("Edit button navigates to the edit page", async () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act - render the component
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationsTable
            UCSBOrganizations={ucsbOrganizationsFixtures.threeUCSBOrganizations}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // assert - check that the expected content is rendered
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgCode`),
    ).toHaveTextContent("ACM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`),
    ).toHaveTextContent("UCSB ACM");

    const editButton = screen.getByTestId(
      `${testId}-cell-row-0-col-Edit-button`,
    );
    expect(editButton).toBeInTheDocument();

    // act - click the edit button
    fireEvent.click(editButton);

    // assert - check that the navigate function was called with the expected path
    await waitFor(() =>
      expect(mockedNavigate).toHaveBeenCalledWith(
        "/ucsborganizations/edit/ACM",
      ),
    );
  });

  test("Delete button calls delete callback", async () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    const axiosMock = new AxiosMockAdapter(axios);
    axiosMock
      .onDelete("/api/ucsborganizations")
      .reply(200, { message: "UCSBOrganizations deleted" });

    // act - render the component
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationsTable
            UCSBOrganizations={ucsbOrganizationsFixtures.threeUCSBOrganizations}
            currentUser={currentUser}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // assert - check that the expected content is rendered
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgCode`),
    ).toHaveTextContent("ACM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-orgTranslationShort`),
    ).toHaveTextContent("UCSB ACM");

    const deleteButton = screen.getByTestId(
      `${testId}-cell-row-0-col-Delete-button`,
    );
    expect(deleteButton).toBeInTheDocument();

    // act - click the delete button
    fireEvent.click(deleteButton);

    // assert - check that the delete endpoint was called
    await waitFor(() => expect(axiosMock.history.delete.length).toBe(1));
    expect(axiosMock.history.delete[0].params).toEqual({ orgCode: "ACM" });
  });
});
