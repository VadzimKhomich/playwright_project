import { test, expect } from "fixtures/busibess.fixture";
import { metricsData } from "tests/demoForm/test-data/test-data";

test.describe("[Integration] [Sales Portal] [Metrics]", async () => {
  for (const { name, value, metric } of metricsData) {
    test(`Check ${name} metric`, async ({ loginAsAdmin, mock, homePage }) => {
      await mock.metrics(value, metric);
      await loginAsAdmin();
      await homePage.waitForOpened();
      const actual = await homePage.getMetricData(metric);
      expect(value).toBe(actual);
    });
  }
});
