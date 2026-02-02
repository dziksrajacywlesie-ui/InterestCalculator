// Obsługa generowania i kopiowania linka z parametrami formularza
export function handleShareLink() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const params = new URLSearchParams();
            params.set('amount', document.getElementById('amount').value);
            params.set('interest', document.getElementById('interest').value);
            params.set('payments', document.getElementById('payments').value);
            params.set('overpayment', document.getElementById('overpayment').value);
            const paymentType = document.querySelector('input[name="payment-type"]:checked').value;
            params.set('paymentType', paymentType);
            const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
            navigator.clipboard.writeText(url);
            alert('Link został skopiowany do schowka!');
        });
    }
}
