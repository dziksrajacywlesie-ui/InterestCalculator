// Obsługa query string do wypełniania formularza
export function handleQueryString() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('amount')) document.getElementById('amount').value = params.get('amount');
    if (params.has('interest')) document.getElementById('interest').value = params.get('interest');
    if (params.has('payments')) document.getElementById('payments').value = params.get('payments');
    if (params.has('overpayment')) document.getElementById('overpayment').value = params.get('overpayment');
    if (params.has('paymentType')) {
        const type = params.get('paymentType');
        const radio = document.querySelector(`input[name="payment-type"][value="${type}"]`);
        if (radio) radio.checked = true;
        // Pokaż/ukryj opcje nadpłaty
        const overpaymentOptions = document.querySelector('.overpayment-options');
        if (overpaymentOptions) {
            if (type === 'equal') {
                overpaymentOptions.style.display = 'flex';
            } else {
                overpaymentOptions.style.display = 'none';
            }
        }
    }
}
