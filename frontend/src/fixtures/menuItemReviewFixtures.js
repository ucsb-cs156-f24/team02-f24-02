const menuItemReviewFixtures = {
    oneReview: {
      id: 1,
      itemId: 1,
      reviewerEmail: "reviewer1@email.com",
      stars: 5,
      dateReviewed: "2023-01-13T13:30:00",
      comments: "Great!",
    },
    threeReviews: [
      {
        id: 1,
        itemId: 2,
        reviewerEmail: "reviewer1@email.com",
        stars: 5,
        dateReviewed: "2021-04-15T13:23:00",
        comments: "Best food",
      },
      {
        id: 2,
        itemId: 3,
        reviewerEmail: "reviewer2@email.com",
        stars: 3,
        dateReviewed: "2023-08-16T12:04:00",
        comments: "Was ok and decent but not great.",
      },
      {
        id: 3,
        itemId: 4,
        reviewerEmail: "reviewer3@email.com",
        stars: 1,
        dateReviewed: "2020-07-14T14:12:00",
        comments: "Terrible, cold and too mild",
      },
    ],
  };
  
  export { menuItemReviewFixtures };
  