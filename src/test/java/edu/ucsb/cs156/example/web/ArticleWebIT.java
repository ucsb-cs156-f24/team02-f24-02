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

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class ArticleWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_article() throws Exception {
        setupUser(true);

        page.getByText("Articles").click();

        page.getByText("Create Article").click();
        assertThat(page.getByText("Create New Article")).isVisible();
        
        page.getByTestId("ArticlesForm-title").fill("Introduction to REST APIs");
        page.getByTestId("ArticlesForm-url").fill("https://www.redhat.com/en/topics/api/what-is-a-rest-api");
        page.getByTestId("ArticlesForm-explanation").fill("An article introducing RESTful APIs, their uses, and structure.");
        page.getByTestId("ArticlesForm-email").fill("apiuser@example.com");
        page.getByTestId("ArticlesForm-dateAdded").fill("2023-02-20T09:45:00");
        page.getByTestId("ArticlesForm-submit").click();
        
        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-title"))
                .hasText("Introduction to REST APIs");
        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-url"))
                .hasText("https://www.redhat.com/en/topics/api/what-is-a-rest-api");
        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-explanaton"))
                .hasText("An article introducing RESTful APIs, their uses, and structure.");
        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-email"))
                .hasText("apiuser@example.com");
        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-dateAdded"))
                .hasText("2023-02-20T09:45:00");

        page.getByTestId("ArticlesTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit Article")).isVisible();
        page.getByTestId("ArticlesForm-explanation").fill("hot garbage idk");
        page.getByTestId("ArticlesForm-submit").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-explanation")).hasText("hot garbage idk");

        page.getByTestId("ArticlesTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-name")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_article() throws Exception {
        setupUser(false);

        page.getByText("Articles").click();

        assertThat(page.getByText("Create")).not().isVisible();
        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-name")).not().isVisible();
    }
}