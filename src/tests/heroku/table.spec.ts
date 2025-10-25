import test, { expect, Page } from "@playwright/test";

async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
  const table = page.locator("#table2");
  const headers = await table.locator("th").allInnerTexts();
  headers.pop();
  const row = table.locator("tbody tr").filter({ hasText: email });
  const rowData = await row.locator("td").allInnerTexts();
  rowData.pop();
  expect(headers.length).toBe(rowData.length);
  const resultObject = headers.reduce<Record<string, string>>((result, header, i) => {
    result[header] = rowData[i] ?? "";
    return result;
  }, {});
  return resultObject;
}

test.describe("[Heroku App] [table]", () => {
  const URL = "https://the-internet.herokuapp.com";
  test("Single locator with more than element", async ({ page }) => {
    const NUMBER_OF_LINKS = 44;
    await page.goto(URL);
    const allLinks = page.locator("ul li a");
    const allLinksWithAInText = allLinks.filter({ hasText: "a" });
    const firstElement = allLinks.first();
    const lasttElement = allLinks.last();
    const secondElement = allLinks.nth(1);
    const numberOfLincs = await allLinks.count();
    const numberOfFilterdLinks = await allLinksWithAInText.count();
    console.log(numberOfLincs, numberOfFilterdLinks);
    console.log(await firstElement.innerText());
    console.log(await secondElement.innerText());
    console.log(await lasttElement.innerText());

    await expect(allLinks).toHaveCount(NUMBER_OF_LINKS);
  });

  test("Single locator with more than element", async ({ page }) => {
    await page.goto(URL);
    const allLinks = page.locator("ul li a");
    const arrayOfLinks = await allLinks.all();
    const texts = await Promise.all(arrayOfLinks.map((link) => link.innerText()));
    console.log(texts);
  });

  test("Parse table data", async ({ page }) => {
    const expectedTable = [
      {
        "Last Name": "Smith",
        "First Name": "John",
        Email: "jsmith@gmail.com",
        Due: "$50.00",
        "Web Site": "http://www.jsmith.com",
      },
      {
        "Last Name": "Bach",
        "First Name": "Frank",
        Email: "fbach@yahoo.com",
        Due: "$51.00",
        "Web Site": "http://www.frank.com",
      },
      {
        "Last Name": "Doe",
        "First Name": "Jason",
        Email: "jdoe@hotmail.com",
        Due: "$100.00",
        "Web Site": "http://www.jdoe.com",
      },
      {
        "Last Name": "Conway",
        "First Name": "Tim",
        Email: "tconway@earthlink.net",
        Due: "$50.00",
        "Web Site": "http://www.timconway.com",
      },
    ];
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = page.locator("#table1");
    const headersLocator = await page.locator("#table1 th").all();
    headersLocator.pop();
    const headers = await Promise.all(headersLocator.map((el) => el.innerText()));

    const tableRows = await table.locator("tbody tr").all();
    const tableData: Record<string, string>[] = [];
    for (const row of tableRows) {
      const cell = await row
        .locator("td")
        .filter({ hasNot: page.locator("a") })
        .allInnerTexts();

      const rowData = headers.reduce<Record<string, string>>((result, header, i) => {
        result[header] = cell[i] ?? "";
        return result;
      }, {});
      tableData.push(rowData);
    }
    expect(expectedTable.length, `Numper of rows in table should be ${expectedTable.length}`).toBe(tableData.length);
    expectedTable.forEach((row, i) => {
      expect(row, "Expected row should be equal").toEqual(tableData[i]);
    });
  });

  test("Check getTableRow function", async ({ page }) => {
    const tableDataExpected = [
      {
        "Last Name": "Smith",
        "First Name": "John",
        Email: "jsmith@gmail.com",
        Due: "$50.00",
        "Web Site": "http://www.jsmith.com",
      },
      {
        "Last Name": "Bach",
        "First Name": "Frank",
        Email: "fbach@yahoo.com",
        Due: "$51.00",
        "Web Site": "http://www.frank.com",
      },
      {
        "Last Name": "Doe",
        "First Name": "Jason",
        Email: "jdoe@hotmail.com",
        Due: "$100.00",
        "Web Site": "http://www.jdoe.com",
      },
      {
        "Last Name": "Conway",
        "First Name": "Tim",
        Email: "tconway@earthlink.net",
        Due: "$50.00",
        "Web Site": "http://www.timconway.com",
      },
    ];
    const table = page.locator("#table2");
    await page.goto("https://the-internet.herokuapp.com/tables");
    const emails = await table.locator("tbody tr td.email").allInnerTexts();
    for (const email of emails) {
      const row = await getTableRow(page, email);
      expect(tableDataExpected).toContainEqual(row);
    }
  });
});
