// Klasa do generowania harmonogramu rat malejących
export class DecreasingPaymentSchedule {
    constructor(amount, interest, payments, overpayment, firstPaymentDate) {
        this.amount = amount;
        this.interest = interest;
        this.payments = payments;
        this.overpayment = overpayment;
        this.firstPaymentDate = firstPaymentDate;
    }

    generate() {
        const schedule = [];
        let balance = this.amount;
        let date = new Date(this.firstPaymentDate);
        const capitalPart = this.#calculateCapitalPart();
        for (let i = 1; i <= this.payments; i++) {
            const interestPart = balance * this.interest;
            const payment = capitalPart + interestPart;
            const currentPayment = this.#calculateCurrentPayment(payment, interestPart, balance);
            schedule.push({
                nr: i,
                date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
                payment: currentPayment.toFixed(2),
                capital: (currentPayment - interestPart).toFixed(2),
                interest: interestPart.toFixed(2),
                balance: (balance - (currentPayment - interestPart)).toFixed(2)
            });
            balance -= (currentPayment - interestPart);
            if (balance <= 0) break;
            date.setMonth(date.getMonth() + 1);
        }
        return schedule;
    }

    #calculateCapitalPart() {
        return this.amount / this.payments;
    }

    #calculateCurrentPayment(payment, interestPart, balance) {
        let currentPayment = payment + (this.overpayment > 0 ? this.overpayment : 0);
        if (balance < currentPayment) {
            currentPayment = balance + interestPart;
        }
        return currentPayment;
    }
}
