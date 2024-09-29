document.getElementById('convert-btn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');

    if (!amount) {
        resultDiv.innerHTML = 'Please enter an amount.';
        return;
    }

    try {
        const response = await fetch(`/convert?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);
        const data = await response.json();

        if (data.success) {
            resultDiv.innerHTML = `${amount} ${fromCurrency} = ${data.convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            resultDiv.innerHTML = 'Error: ' + data.message;
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error: Unable to perform conversion.';
    }
});