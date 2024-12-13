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
public class UCSBDiningCommonsMenuItemsWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_ucsb_dining_commons_menu_items() throws Exception {
        setupUser(true);

        page.getByText("Menu Items").click();

        page.getByText("Create UCSBDiningCommonsMenuItems").click();
        assertThat(page.getByText("Create New UCSBDiningCommonsMenuItems")).isVisible();
        page.getByTestId("UCSBDiningCommonsMenuItemsForm-diningCommonsCode").fill("Portola");
        page.getByTestId("UCSBDiningCommonsMenuItemsForm-name").fill("Pasta");
        page.getByTestId("UCSBDiningCommonsMenuItemsForm-station").fill("Brick");
        page.getByTestId("UCSBDiningCommonsMenuItemsForm-submit").click();

        assertThat(page.getByTestId("UCSBDiningCommonsMenuItemsTable-cell-row-0-col-name"))
                .hasText("Pasta");

        page.getByTestId("UCSBDiningCommonsMenuItemsTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit UCSBDiningCommonsMenuItems")).isVisible();
        page.getByTestId("UCSBDiningCommonsMenuItemsForm-station").fill("Brick");
        page.getByTestId("UCSBDiningCommonsMenuItemsForm-submit").click();

        assertThat(page.getByTestId("UCSBDiningCommonsMenuItemsTable-cell-row-0-col-station")).hasText("Brick");

        page.getByTestId("UCSBDiningCommonsMenuItemsTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("UCSBDiningCommonsMenuItemsTable-cell-row-0-col-name")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_ucsb_dining_commons_menu_items() throws Exception {
        setupUser(false);

        page.getByText("Menu Items").click();

        assertThat(page.getByText("Create UCSBDiningCommonsMenuItems")).not().isVisible();
        assertThat(page.getByTestId("UCSBDiningCommonsMenuItemsTable-cell-row-0-col-name")).not().isVisible();
    }
}