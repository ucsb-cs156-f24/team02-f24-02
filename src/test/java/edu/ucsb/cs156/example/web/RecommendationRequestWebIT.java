package edu.ucsb.cs156.example.web;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;
import edu.ucsb.cs156.example.entities.RecommendationRequest;
import edu.ucsb.cs156.example.repositories.RecommendationRequestRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")

@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class RecommendationRequestWebIT extends WebTestCase {
    @Autowired
    public RecommendationRequestRepository recommendationRequestRepository;
    @Test
    public void admin_user_can_edit_and_delete_restaurant() throws Exception {
        RecommendationRequest recommendationRequest = RecommendationRequest.builder()
                                .requesterEmail("student@ucsb.edu")
                                .professorEmail("professor@ucsb.edu")
                                .dateRequested(LocalDateTime.parse("2024-10-30T01:08"))
                                .dateNeeded(LocalDateTime.parse("2024-11-21T01:08"))
                                .explanation("A very good reason")
                                .done(false)
                                .build();
        recommendationRequestRepository.save(recommendationRequest);
        setupUser(true);
        page.getByText("RecommendationRequest").click();

        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-explanation"))
                .hasText("A very good reason");

        page.getByTestId("RecommendationRequestTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit RecommendationRequest")).isVisible();
        page.getByTestId("RecommendationRequestForm-explanation").fill("Actually it's a bad one");
        page.getByTestId("RecommendationRequestForm-submit").click();

        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-explanation")).hasText("Actually it's a bad one");

        page.getByTestId("RecommendationRequestTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-name")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_restaurant() throws Exception {
        setupUser(false);

        page.getByText("RecommendationRequest").click();

        assertThat(page.getByText("Create RecommendationRequest")).not().isVisible();
        assertThat(page.getByTestId("RecommendationRequestTable-cell-row-0-col-explanation")).not().isVisible();
    }
}