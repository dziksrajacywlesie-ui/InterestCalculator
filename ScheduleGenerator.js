import { EqualPaymentSchedule } from './EqualPaymentSchedule.js';
import { DecreasingPaymentSchedule } from './DecreasingPaymentSchedule.js';

// Klasa uniwersalna do generowania harmonogramu (równych lub malejących)
export class ScheduleGenerator {
    constructor({amount, interest, payments, overpayment, firstPaymentDate, isDecreasing, overpaymentType}) {
        this.amount = amount;
        this.interest = interest;
        this.payments = payments;
        this.overpayment = overpayment;
        this.firstPaymentDate = firstPaymentDate;
        this.isDecreasing = isDecreasing;
        this.overpaymentType = overpaymentType;
    }

    generate() {
        if (this.isDecreasing) {
            const schedule = new DecreasingPaymentSchedule(
                this.amount,
                this.interest,
                this.payments,
                this.overpayment,
                this.firstPaymentDate
            );
            return schedule.generate();
        } else {
            const schedule = new EqualPaymentSchedule(
                this.amount,
                this.interest,
                this.payments,
                this.overpayment,
                this.firstPaymentDate
            );
            return schedule.generate();
        }
    }
}
