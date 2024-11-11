import React from "react";
import { useBackend } from "main/utils/useBackend";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBDiningCommonsMenuItemsTable from "main/components/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsTable";
import { Button } from "react-bootstrap";
import { useCurrentUser, hasRole } from "main/utils/currentUser";

export default function UCSBDiningCommonsMenuItemsIndexPage() {
  const currentUser = useCurrentUser();

  const createButton = () => {
    if (hasRole(currentUser, "ROLE_ADMIN")) {
      return (
        <Button
          variant="primary"
          href="/ucsbdiningcommonsmenuitems/create"
          style={{ float: "right" }}
        >
          Create UCSBDiningCommonsMenuItems
        </Button>
      );
    }
  };

  const {
    data: items,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/ucsbdiningcommonsmenuitems/all"],
    { method: "GET", url: "/api/ucsbdiningcommonsmenuitems/all" },
    [],
  );

  return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>UCSBDiningCommonsMenuItems</h1>
        <UCSBDiningCommonsMenuItemsTable
          ucsbDiningCommonsMenuItems={items}
          currentUser={currentUser}
        />
      </div>
    </BasicLayout>
  );
}
