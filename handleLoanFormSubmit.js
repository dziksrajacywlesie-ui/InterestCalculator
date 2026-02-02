import { ScheduleGenerator } from './ScheduleGenerator.js';
import { SavingsSummaryRenderer } from './SavingsSummaryRenderer.js';
import { ScheduleRenderer } from './ScheduleRenderer.js';

export function handleLoanFormSubmit(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const interest = parseFloat(document.getElementById('interest').value) / 100 / 12;
    const overpayment = parseFloat(document.getElementById('overpayment').value) || 0;
    const payments = parseInt(document.getElementById('payments').value, 10);
    if (!payments || payments <= 0) {
        document.getElementById('result').innerHTML = '<p>Podaj poprawną liczbę rat.</p>';
        return;
    }
    // Ustal datę pierwszej raty na podstawie dnia dzisiejszego (np. pierwszy dzień kolejnego miesiąca)
    const today = new Date();
    let firstPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    if (firstPaymentDate < today) {
        firstPaymentDate.setMonth(firstPaymentDate.getMonth() + 1);
    }

    const isDecreasing = document.querySelector('input[name="payment-type"]:checked').value === 'decreasing';
    
    // Harmonogram bez nadpłaty
    const scheduleNoOver = new ScheduleGenerator({
        amount,
        interest,
        payments,
        overpayment: 0,
        firstPaymentDate,
        isDecreasing,
        overpaymentType: undefined
    }).generate();
    // Harmonogram z nadpłatą
    let overpaymentType;
    if (!isDecreasing && overpayment > 0) {
        overpaymentType = document.querySelector('input[name="overpayment-type"]:checked')?.value;
    }
    const scheduleWithOver = overpayment > 0 ? new ScheduleGenerator({
        amount,
        interest,
        payments,
        overpayment,
        firstPaymentDate,
        isDecreasing,
        overpaymentType
    }).generate() : null;
    // Wyświetlanie wyników
    let resultHtml = SavingsSummaryRenderer.render(scheduleNoOver, scheduleWithOver);
    resultHtml += '<div class="flex-container">';
    resultHtml += `<div class="schedule-container">${ScheduleRenderer.render(scheduleNoOver, 'Harmonogram bez nadpłaty')}</div>`;
    if (scheduleWithOver) {
        resultHtml += `<div class="schedule-container">${ScheduleRenderer.render(scheduleWithOver, 'Harmonogram z nadpłatą', scheduleNoOver, overpayment)}</div>`;
    }
    resultHtml += '</div>';
    document.getElementById('result').innerHTML = resultHtml;
}
