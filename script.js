document.getElementById('convert-btn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value.toUpperCase();
    const toCurrency = document.getElementById('to-currency').value.toUpperCase();
    const resultDiv = document.getElementById('result');

    if (!amount || !fromCurrency || !toCurrency) {
        resultDiv.innerHTML = 'Please fill all fields.';
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