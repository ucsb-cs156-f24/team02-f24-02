import React from "react";
import UCSBOrganizationsTable from "main/components/UCSBOrganization/UCSBOrganizationTable";
import { ucsbOrganizationsFixtures } from "fixtures/ucsbOrganizationFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw";

export default {
  title: "components/UCSBOrganization/UCSBOrganizationTable",
  component: UCSBOrganizationsTable,
};

const Template = (args) => {
  return <UCSBOrganizationsTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  UCSBOrganizations: [],
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  UCSBOrganizations: ucsbOrganizationsFixtures.threeUCSBOrganizations,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  UCSBOrganizations: ucsbOrganizationsFixtures.threeUCSBOrganizations,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: [
    http.delete("/api/ucsborganizations", () => {
      return HttpResponse.json(
        { message: "UCSBOrganizations deleted successfully" },
        { status: 200 },
      );
    }),
  ],
};
