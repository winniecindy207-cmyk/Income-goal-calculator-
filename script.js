function addStream() {
  const list = document.getElementById('streams-list');
  const div = document.createElement('div');
  div.className = 'stream-item';
  div.innerHTML = `
    <select class="stream-type">
      <option value="">Select type</option>
      <option value="Digital Product">Digital Product</option>
      <option value="Freelance Service">Freelance Service</option>
      <option value="Coaching">Coaching</option>
      <option value="Affiliate Marketing">Affiliate Marketing</option>
      <option value="Content Creation">Content Creation</option>
      <option value="Physical Product">Physical Product</option>
      <option value="Other">Other</option>
    </select>
    <input type="number" class="stream-price" placeholder="Price per sale (₦)">
    <button class="remove-btn" onclick="removeStream(this)">✕</button>
  `;
  list.appendChild(div);
}

function removeStream(btn) {
  const list = document.getElementById('streams-list');
  if (list.children.length > 1) {
    btn.parentElement.remove();
  } else {
    alert('You need at least one income stream!');
  }
}

function calculate() {
  const goal = parseFloat(document.getElementById('goal').value);
  const months = parseFloat(document.getElementById('months').value);

  if (!goal || !months) {
    alert('Please enter your income goal and number of months!');
    return;
  }

  const streams = document.querySelectorAll('.stream-item');
  let validStreams = [];

  streams.forEach(stream => {
    const type = stream.querySelector('.stream-type').value;
    const price = parseFloat(stream.querySelector('.stream-price').value);
    if (type && price) {
      validStreams.push({ type, price });
    }
  });

  if (validStreams.length === 0) {
    alert('Please add at least one income stream with a price!');
    return;
  }

  const perStream = goal / validStreams.length;
  const monthlyGoal = goal / months;
  const dailyGoal = monthlyGoal / 30;

  let html = `<h2>📊 Your Income Plan</h2>`;

  validStreams.forEach(stream => {
    const totalSales = Math.ceil(perStream / stream.price);
    const salesPerMonth = Math.ceil(totalSales / months);
    const salesPerDay = Math.ceil(salesPerMonth / 30);

    html += `
      <div class="stream-result">
        <h3>${stream.type}</h3>
        <p>Price per sale: <span class="highlight">₦${stream.price.toLocaleString()}</span></p>
        <p>Total sales needed: <span class="highlight">${totalSales} sales</span></p>
        <p>Per month: <span class="highlight">${salesPerMonth} sales/month</span></p>
        <p>Per day: <span class="highlight">${salesPerDay} sales/day</span></p>
      </div>
    `;
  });

  html += `
    <div class="summary-box">
      <h3>📌 Your Summary</h3>
      <p>Total Goal: <strong>₦${goal.toLocaleString()}</strong></p>
      <p>Timeline: <strong>${months} months</strong></p>
      <p>Monthly Target: <strong>₦${monthlyGoal.toLocaleString()}</strong></p>
      <p>Daily Target: <strong>₦${dailyGoal.toFixed(0).toLocaleString()}</strong></p>
      <p>Income Streams: <strong>${validStreams.length}</strong></p>
    </div>
  `;

  const result = document.getElementById('result');
  result.classList.add('show');
  result.innerHTML = html;
}
