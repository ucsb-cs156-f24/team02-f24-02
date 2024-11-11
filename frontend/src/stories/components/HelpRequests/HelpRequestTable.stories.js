import React from "react";

import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw";
import HelpRequestTable from "main/components/HelpRequests/HelpRequestTable";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";

export default {
  title: "components/HelpRequest/HelpRequestTable",
  component: HelpRequestTable,
};

const Template = (args) => {
  return <HelpRequestTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  helpRequests: [],
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  helpRequests: helpRequestFixtures.threeRequests,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  helpRequests: helpRequestFixtures.threeRequests,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: [
    http.delete("/api/helprequest", () => {
      return HttpResponse.json({}, { status: 200 });
    }),
  ],
};