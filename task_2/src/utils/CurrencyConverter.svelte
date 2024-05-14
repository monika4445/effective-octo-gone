<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import currencies from './currencies';
  import './CurrencyConverter.css';

  let amountFrom = 1;
  let amountTo = 0;
  let sourceCurrency = 'USD';
  let targetCurrency = 'EUR';
  let convertedAmount = 0;

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
      const data = await response.json();
      const rate = data.rates[targetCurrency];
      if (rate) {
        convertedAmount = amountFrom * rate;
        amountTo = convertedAmount;
      } else {
        console.error('Failed to fetch exchange rate.');
      }
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
    }
  };

  const handleAmountFromChange = (event) => {
    amountFrom = parseFloat(event.target.value);
    fetchExchangeRate();
  };

  const handleAmountToChange = (event) => {
    amountTo = parseFloat(event.target.value);
    amountFrom = amountTo / convertedAmount;
  };

  const handleSourceCurrencyChange = (event) => {
    sourceCurrency = event.target.value;
    fetchExchangeRate();
  };

  const handleTargetCurrencyChange = (event) => {
    targetCurrency = event.target.value;
    fetchExchangeRate();
  };

  const reverseCurrencies = () => {
    const temp = sourceCurrency;
    sourceCurrency = targetCurrency;
    targetCurrency = temp;
    fetchExchangeRate();
  };

  onMount(fetchExchangeRate);
</script>

<main class="container">
  <h1 class="heading">Currency Converter</h1>
  
  <div class="input-group">
    <div class="segment">
      <!-- Upper segment -->
      <div class="dropdown">
        <label for="fromCurrency">From:</label>
        <select id="fromCurrency" class="select" bind:value={sourceCurrency} on:change={handleSourceCurrencyChange}>
          {#each currencies as currency}
            <option value={currency.code}>{currency.name}</option>
          {/each}
        </select>
      </div>
      <div class="reverse-icon" role="button" tabindex="0" on:click={reverseCurrencies} on:keydown={(event) => {if (event.key === 'Enter' || event.key === 'Space') reverseCurrencies()}}>
        <img src="./public/reverse-icon.png" alt="Reverse Icon">
      </div>
      <div class="dropdown">
        <label for="toCurrency">To:</label>
        <select id="toCurrency" class="select" bind:value={targetCurrency} on:change={handleTargetCurrencyChange}>
          {#each currencies as currency}
            <option value={currency.code}>{currency.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  
  <div class="input-group"></div>
    <!-- Lower segment -->
    <div class="lower-segment">
      <div class="segment">
        <input type="number" id="amountFrom" class="input" bind:value={amountFrom} on:input={handleAmountFromChange}>
      </div>
      <div class="segment">
        <input type="number" id="amountTo" class="input" bind:value={amountTo} on:input={handleAmountToChange}>
      </div>
    </div>

</main>
