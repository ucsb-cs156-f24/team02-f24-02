const recommendationRequestFixtures = {
  oneRecRequest: [
    {
      id: 0,
      requesterEmail: "prof@ucsb.edu",
      professorEmail: "stud@ucsb.edu",
      explanation: "I need to get into grad school!",
      dateRequested: "2024-10-30T01:08",
      dateNeeded: "2024-11-21T01:08",
      done: "true",
    },
  ],

  threeRecRequests: [
    {
      id: 1,
      requesterEmail: "someguy@gmail.com",
      professorEmail: "coolprof@hotmail.com",
      explanation: "I want to do research!",
      dateRequested: "2024-10-30T01:08",
      dateNeeded: "2024-12-30T01:08",
      done: "true",
    },
    {
      id: 2,
      requesterEmail: "bingus@bing.com",
      professorEmail: "bongus@bong.com",
      explanation: "I want a job!",
      dateRequested: "2024-10-30T01:08",
      dateNeeded: "2025-10-30T01:08",
      done: "true",
    },
    {
      id: 3,
      requesterEmail: "bunny@animal.com",
      professorEmail: "rabbit@animal.com",
      explanation: "I just want to know what you think of me",
      dateRequested: "2024-10-30T01:08",
      dateNeeded: "2026-10-30T01:08",
      done: "false",
    },
  ],
};

export { recommendationRequestFixtures };
