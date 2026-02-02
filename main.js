import { handleQueryString } from './queryStringHandler.js';
import { handleShareLink } from './shareLinkHandler.js';
import { handleLoanFormSubmit } from './handleLoanFormSubmit.js';

// Nasłuchiwanie na formularz
document.getElementById('loan-form').addEventListener('submit', handleLoanFormSubmit);

// Sprawdzenie początkowego stanu
window.addEventListener('load', function() {
    const selectedPaymentType = document.querySelector('input[name="payment-type"]:checked');
    const overpaymentOptions = document.querySelector('.overpayment-options');
    if (overpaymentOptions) {
        if (selectedPaymentType && selectedPaymentType.value === 'equal') {
            overpaymentOptions.style.display = 'flex';
        } else {
            overpaymentOptions.style.display = 'none';
        }
    }
});


// Obsługa query string do wypełniania formularza
window.addEventListener('DOMContentLoaded', function() {
    handleQueryString();
    handleShareLink();
});

// Koniec skryptu
