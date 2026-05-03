function calculate() {
  const goal = parseFloat(document.getElementById('goal').value);
  const price = parseFloat(document.getElementById('price').value);
  const days = parseFloat(document.getElementById('days').value);

  if (!goal || !price || !days) {
    alert('Please fill in all three fields!');
    return;
  }

  const totalSales = Math.ceil(goal / price);
  const salesPerDay = Math.ceil(totalSales / days);
  const dailyIncome = (goal / days).toFixed(0);

  const result = document.getElementById('result');
  result.classList.add('show');
  result.innerHTML = `
    <h2>📊 Your Goal Breakdown</h2>
    <p>To make <span class="highlight">₦${goal.toLocaleString()}</span> in <span class="highlight">${days} days</span>:</p>
    <p>You need to sell <span class="highlight">${totalSales} copies</span> total</p>
    <p>That's <span class="highlight">${salesPerDay} sales per day</span></p>
    <p>Which equals <span class="highlight">₦${Number(dailyIncome).toLocaleString()} per day</span></p>
    <p style="margin-top:16px; color:#888; font-size:13px;">You can do this. Start today. 💪</p>
  `;
}
