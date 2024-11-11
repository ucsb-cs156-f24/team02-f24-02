const helpRequestFixtures = {
  oneRequest: {
    id: 1,
    requesterEmail: "cgaucho@ucsb.edu",
    teamId: "s22-5pm-3",
    tableOrBreakoutRoom: "7",
    requestTime: "2022-01-03T00:00:00",
    explanation: "Need help with Swagger-ui",
    solved: "false",
  },
  threeRequests: [
    {
      id: 1,
      requesterEmail: "cgaucho@ucsb.edu",
      teamId: "s22-5pm-3",
      tableOrBreakoutRoom: "7",
      requestTime: "2022-01-03T00:00:00",
      explanation: "Need help with Swagger-ui",
      solved: "false",
    },
    {
      id: 2,
      requesterEmail: "ldelplaya@ucsb.edu",
      teamId: "s22-6pm-3",
      tableOrBreakoutRoom: "11",
      requestTime: "2022-03-11T00:00:00",
      explanation: "Dokku problems",
      solved: "false",
    },
    {
      id: 3,
      requesterEmail: "johndoe@ucsb.edu",
      teamId: "s22-5pm-3",
      tableOrBreakoutRoom: "9",
      requestTime: "2022-04-01T00:00:00",
      explanation: "Having storybook issues",
      solved: "false",
    },
  ],
};

export { helpRequestFixtures };
