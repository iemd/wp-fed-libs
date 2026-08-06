/**
 * 12. Build a Currency Converter (Certification Project)
 */
const { useState, useMemo } = React;

export function CurrencyConverter() {

    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");

    const exchangeRate = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.78,
        JPY: 156.7
    }

    const convertedAmounts = useMemo(() => {
        const converted = {};
        Object.keys(exchangeRate).forEach((currency) => {
            converted[currency] = ((amount / exchangeRate[fromCurrency]) * exchangeRate[currency]).toFixed(2);
        });
        return converted;
    }, [amount, fromCurrency]);

    return (
        <div className="container">
            <h1>Currency Converter</h1>
            <p className="conversion">{fromCurrency} to {toCurrency} Conversion</p>
            <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min="0"
            />
            <label>Start Currecny:
                <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
            </label>
            <label>Target Currency:
                <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                </select>
            </label>
            <p>Converted Amount: <span>{convertedAmounts[toCurrency]}</span> {toCurrency}</p>
        </div>
    );
}
