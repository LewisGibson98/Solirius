import { test, expect } from '@playwright/test';
import { HolidayCalculator } from './Helpers/Holiday-Calc-Helper';

test.describe('Holiday Calculator Tests', () => {

  test('Full-year worker – 5 days a week', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('full-year');
    await calc.ChoosenBasis('days');
    await calc.ConfirmDates();
    await calc.DaysWorked(5);
    await calc.expectedResults('28 days holiday');
  });

  test('Irregular hours – 1500 hours per year', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('irregular');
    await calc.ConfirmDates();
    await calc.EmploymentDates('01-01-2024', '31-12-2024');
    await calc.HoursWorked(1500);
    await calc.expectedResults('hours holiday'); 
  });

  test('Part-year worker – 3 days a week', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('part-year');
    await calc.ChoosenBasis('days');
    await calc.ConfirmDates();
    await calc.DaysWorked(3);
    await calc.expectedResults('days holiday'); 
  });

  test('Compressed hours – 37 hours per week', async ({ page }) => {
    const calc = new HolidayCalculator(page);
    await calc.gotostart();
    await calc.chooseWorkerType('compressed');
    await calc.ChoosenBasis('hours');
    await calc.ConfirmDates();
    await calc.HoursWorked(37);
    await calc.expectedResults('hours holiday');
  });

});