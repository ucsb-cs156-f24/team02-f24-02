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
public class UCSBOrganizationWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_ucsborganizations() throws Exception {
        setupUser(true);

        page.getByText("UCSBOrganization").click();

        page.getByText("Create UCSBOrganization").click();
        assertThat(page.getByText("Create New UCSBOrganization")).isVisible();
        page.getByTestId("UCSBOrganizationsForm-orgCode").fill("ZPR");
        page.getByTestId("UCSBOrganizationsForm-orgTranslationShort").fill("ZETA PHI RHO");
        page.getByTestId("UCSBOrganizationsForm-orgTranslation").fill("ZETA PHI RHO FRAT");
        page.getByTestId("UCSBOrganizationsForm-inactive").selectOption("false");
        page.getByTestId("UCSBOrganizationsForm-submit").click();

        assertThat(page.getByTestId("UCSBOrganizationsTable-cell-row-0-col-orgTranslation"))
                .hasText("ZETA PHI RHO FRAT");

        page.getByTestId("UCSBOrganizationsTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit UCSBOrganization")).isVisible();
        page.getByTestId("UCSBOrganizationsForm-inactive").selectOption("true");
        page.getByTestId("UCSBOrganizationsForm-submit").click();

        assertThat(page.getByTestId("UCSBOrganizationsTable-cell-row-0-col-inactive")).hasText("true");

        page.getByTestId("UCSBOrganizationsTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("UCSBOrganizationsTable-cell-row-0-col-orgCode")).not().isVisible();
    }
}