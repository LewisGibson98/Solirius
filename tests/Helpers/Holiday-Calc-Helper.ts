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

async ChoosenBasis(basis: 'days' | 'hours') {
    if (basis === 'days') {
        await this.page.getByLabel('Days worked per week').check();
    } else {
        await this.page.getByLabel('Hours worked per week').check();
    }
    await this.page.getByRole('button', {name: /continue/i}).click();
}