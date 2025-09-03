import { test, expect } from '@playwright/test';
import { HolidayCalculator } from './Helpers/Holiday-Calc-Helper';

test.describe('Holiday Calculator Tests', () => {
  
  test('Full Year Worker 5 days a week', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('full-year');
    await calc.ChoosenBasis('days');
    await calc.ConfirmDates();
    await calc.DaysWorked(5);
    await calc.expectedResults('28 days Holiday');
  });

  test('Irregular hours, 1500 hours/year', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('irregular');
    await calc.ConfirmDates();
    await calc.EmploymentDates('2024-01-01', '2024-12-31');
    await calc.HoursWorked(1500);
    await calc.expectedResults('hours holiday');
  });

  test('Part-year worker 3 days a week', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('part-year');
    await calc.ChoosenBasis('days');
    await calc.DaysWorked(3);
    await calc.expectedResults('days Holiday');
  });

});