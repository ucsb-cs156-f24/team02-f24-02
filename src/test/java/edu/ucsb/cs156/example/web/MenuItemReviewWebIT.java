package edu.ucsb.cs156.example.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import edu.ucsb.cs156.example.WebTestCase;

import java.time.LocalDateTime;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class MenuItemReviewWebIT extends WebTestCase {
    
    @Test
    public void admin_user_can_create_edit_delete_menu_item_review() throws Exception {
        setupUser(true);

        page.getByText("Menu Item Reviews").click();

        LocalDateTime ldt1 = LocalDateTime.parse("2022-01-03T00:00:00");

        assertThat(page.getByText("Create MenuItemReview")).isVisible();
        page.getByText("Create MenuItemReview").click();
        page.getByTestId("MenuItemReviewForm-itemId").fill("1");
        page.getByTestId("MenuItemReviewForm-reviewerEmail").fill("test@example.com");
        page.getByTestId("MenuItemReviewForm-stars").fill("3");
        page.getByTestId("MenuItemReviewForm-dateReviewed").fill(ldt1.toString());
        page.getByTestId("MenuItemReviewForm-comments").fill("ok");
        page.getByTestId("MenuItemReviewForm-submit").click();

        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments"))
                .hasText("ok");

        page.getByTestId("MenuItemReviewTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit MenuItemReview")).isVisible();
        page.getByTestId("MenuItemReviewForm-comments").fill("great!");
        page.getByTestId("MenuItemReviewForm-submit").click();

        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments"))
                .hasText("great!");

        page.getByTestId("MenuItemReviewTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments"))
                .not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_menu_item_review() throws Exception {
        setupUser(false);

        page.getByText("Menu Item Reviews").click();

        assertThat(page.getByText("Create MenuItemReview")).not().isVisible();
        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments")).not().isVisible();
    }
}