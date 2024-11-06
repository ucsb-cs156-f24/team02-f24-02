import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBDiningCommonsMenuItemsForm from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsForm";
import { ucsbDiningCommonsMenuItemsFixtures } from "fixtures/ucsbDiningCommonsMenuItemsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("UCSBDiningCommonsMenuItemsForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemsForm />
      </Router>,
    );
    await screen.findByText(/Dining Commons Code/);
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a UCSBDiningCommonsMenuItems", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemsForm initialContents={ucsbDiningCommonsMenuItemsFixtures.oneUCSBDiningCommonsMenuItems} />
      </Router>,
    );
    await screen.findByTestId(/UCSBDiningCommonsMenuItemsForm-id/);
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId(/UCSBDiningCommonsMenuItemsForm-id/)).toHaveValue("1");
  });

  test("Correct Error messsages on missing input", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemsForm />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemsForm-submit");
    const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-submit");

    fireEvent.click(submitButton);

    await screen.findByText(/Dining Commons Code is required./);
    expect(screen.getByText(/Name is required./)).toBeInTheDocument();
    expect(screen.getByText(/Station is required./)).toBeInTheDocument();
  });

  test("No Error messsages on good input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <UCSBDiningCommonsMenuItemsForm submitAction={mockSubmitAction} />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemsForm-diningCommonsCode");

    const diningCommonsCodeField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-diningCommonsCode");
    const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-name");
    const stationField = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-station");
    const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-submit");

    fireEvent.change(diningCommonsCodeField, { target: { value: "Portola" } });
    fireEvent.change(nameField, { target: { value: "Pasta" } });
    fireEvent.change(stationField, { target: { value: "Brick" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(
      screen.queryByText(/Dining Commons Code is required./),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Name is required./),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Station is required./),
    ).not.toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemsForm />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemsForm-cancel");
    const cancelButton = screen.getByTestId("UCSBDiningCommonsMenuItemsForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
