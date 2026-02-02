// Klasa do renderowania podsumowania oszczędności odsetek
export class SavingsSummaryRenderer {
    static calculateTotalInterest(schedule) {
        return schedule.reduce((sum, row) => sum + parseFloat(row.interest), 0).toFixed(2);
    }

    static render(scheduleNoOver, scheduleWithOver) {
        const totalInterestNoOver = this.calculateTotalInterest(scheduleNoOver);
        const totalInterestWithOver = scheduleWithOver ? this.calculateTotalInterest(scheduleWithOver) : totalInterestNoOver;
        const savings = (totalInterestNoOver - totalInterestWithOver).toFixed(2);

        return `
        <div class="savings-summary">
            <h2>Podsumowanie odsetek</h2>
            <div class="savings-details">
                <p>Suma odsetek bez nadpłaty: <strong>${totalInterestNoOver} zł</strong></p>
                <p>Suma odsetek z nadpłatą: <strong>${totalInterestWithOver} zł</strong></p>
                <p class="savings-total">Oszczędności na odsetkach: <strong class="savings-highlight">${savings} zł</strong></p>
            </div>
        </div>`;
    }
}
