import {Page, expect} from '@playwright/test';

export class HolidayCalculator{
        readonly page: Page;
        constructor(page: Page){
            this.page = page;
        }

        async gotostart(){
            await this.page.goto('https://www.gov.uk/calulate-your-holiday-entitlement');
            await this.page.getByRole('link', {name: /start now/i}).click();
        }

        // Choose type of worker
    async chooseWorkerType(type: 'full-year' | 'part-year' | 'irregular' | 'compressed' | 'shift' | 'other') {
        const labels: Record<string, string> = {
            'full-year': 'full year',
            'part-year': 'part year',
            'irregular': 'irregular hours',
            'compressed': 'compressed hours',
            'shift': 'shift work',
        };
        await this.page.getByLabel(labels[type]).check();
        await this.page.getByRole('button', {name: /continue/i}).click();
    }
    // Choose basis of calculation (days or hours)
    async ChoosenBasis(basis: 'days' | 'hours') {
        if (basis === 'days') {
            await this.page.getByLabel('Days worked per week').check();
        } else {
            await this.page.getByLabel('Hours worked per week').check();
        }
        await this.page.getByRole('button', {name: /continue/i}).click();
    }
    // Input number of days worked or hours worked
    async DaysWorked(days: number) {
        await this.page.fill('#response', days.toString());
        await this.page.getByRole('button', {name: /continue/i}).click();
    }

    async HoursWorked(hours: number) {
        await this.page.fill('#response', hours.toString());
        await this.page.getByRole('button', {name: /continue/i}).click();
    }

    // Confirm if dates are correct
    async ConfirmDates() {
        await this.page.getByLabel('Yes').check();
        await this.page.getByRole('button', {name: /continue/i}).click();
    }

    async EmploymentDates(startDate: string, endDate: string) {
        const [startDay, startMonth, startYear] = startDate.split('-');
        const [endDay, endMonth, endYear] = endDate.split('-');
        // Fill in start date
        await this.page.fill('#response-0-days', startDay);
        await this.page.fill('#response-0-months', startMonth);
        await this.page.fill('#response-0-years', startYear);
        // Fill in end date
        await this.page.fill('#response-1-days', endDay);
        await this.page.fill('#response-1-months', endMonth);
        await this.page.fill('#response-1-years', endYear);
        await this.page.getByRole('button', {name: /continue/i}).click();
    }

    async expectedResults(text: string) {
        await expect(this.page.locator('main')).toContainText(text);
    }
}