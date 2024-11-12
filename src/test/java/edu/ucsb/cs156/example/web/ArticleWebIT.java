package edu.ucsb.cs156.example.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import java.time.LocalDateTime;

import edu.ucsb.cs156.example.WebTestCase;
import edu.ucsb.cs156.example.entities.Articles;
import edu.ucsb.cs156.example.repositories.articlesRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class ArticleWebIT extends WebTestCase {
    @Autowired
    public articlesRepository articlesRepository;

    @Test
    public void admin_user_can_create_edit_delete_article() throws Exception {
        

        Articles article = Articles.builder()
                .title("Introduction to REST APIs")
                .url("https://www.redhat.com/en/topics/api/what-is-a-rest-api")
                .explanation("An article introducing RESTful APIs, their uses, and structure.")
                .email("apiuser@example.com")
                .dateAdded(LocalDateTime.parse("2023-02-20T09:45:00"))
                .build();
        articlesRepository.save(article);
        
        
        setupUser(true);

        page.getByText("Article").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-title"))
                .hasText("Introduction to REST APIs");

        page.getByTestId("ArticlesTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit Article")).isVisible();
        page.getByTestId("ArticlesForm-title").fill("We're using this one rn");
        page.getByTestId("ArticlesForm-submit").click();

        assertThat(page.getByTestId("ArticlesTable-cell-row-0-col-title")).hasText("We're using this one rn");

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