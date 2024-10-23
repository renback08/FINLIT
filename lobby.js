document.addEventListener("DOMContentLoaded", () => {
  const settingsButton = document.getElementById("settingsButton");
  const settingsDropdown = document.getElementById("settingsDropdown");
  const themeToggle = document.getElementById("themeToggle");
  const logoutButton = document.getElementById("logoutButton");
  const profileButton = document.getElementById("profileButton");
  
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const assessmentButton = document.getElementById("assessmentButton");
  const submenu = document.querySelector(".submenu");
  const subItems = document.querySelectorAll(".sub-item");
  const helpButton = document.getElementById("helpButton");
  const menuButton = document.getElementById("menuButton");
  const expenseTrackerButton = document.getElementById("expenseTrackerButton");
  const librariesButton = document.querySelector('.sidebar-item:nth-child(4)');
  const contentArea = document.getElementById("contentArea");
  const expenseTrackerContent = document.getElementById("expenseTrackerContent");
  const librariesContent = document.getElementById("librariesContent");

  // Dropdown functionality for settings button
  settingsButton.addEventListener("click", () => {
    settingsDropdown.classList.toggle("show");
  });

  // Close the dropdown if clicked outside
  window.addEventListener("click", (event) => {
    if (!event.target.matches("#settingsButton")) {
      if (settingsDropdown.classList.contains("show")) {
        settingsDropdown.classList.remove("show");
      }
    }
  });

  // Light/Dark mode toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Log out button
  logoutButton.addEventListener("click", () => {
    window.location.href = "logout.php";
  });

  // Profile button (redirect to profile page)
  profileButton.addEventListener("click", () => {
    alert("Profile functionality coming soon!");
  });

  // Display welcome message after logging in
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "popup-message";
  welcomeMessage.innerText = "Welcome to the Lobby! You have successfully logged in.";
  document.body.prepend(welcomeMessage);

  setTimeout(() => {
    welcomeMessage.remove();
  }, 3000);

  function setActiveItem(item) {
    sidebarItems.forEach(btn => btn.classList.remove("active"));
    subItems.forEach(subItem => subItem.classList.remove("active"));
    item.classList.add("active");

    if (item.id === "expenseTrackerButton") {
      toggleExpenseTracker();
    } else {
      hideExpenseTracker();
    }
    if (item.textContent === "Libraries") {
      toggleLibraries();
    } else {
      hideLibraries();
    }
  }

  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      if (!item.classList.contains("sub-item") && !item.classList.contains("has-submenu")) {
        setActiveItem(item);
        submenu.classList.remove("active");
      }
    });
  });

  assessmentButton.addEventListener("click", (event) => {
    event.stopPropagation();
    submenu.classList.toggle("active");
    setActiveItem(assessmentButton);
  });

  subItems.forEach(subItem => {
    subItem.addEventListener("click", (event) => {
      event.stopPropagation();
      setActiveItem(subItem);
    });
  });

  function toggleExpenseTracker() {
    expenseTrackerContent.style.display = "block";
    initExpenseTracker();
  }

  function hideExpenseTracker() {
    expenseTrackerContent.style.display = "none";
  }

  function toggleLibraries() {
    librariesContent.style.display = "block";
  }

  function hideLibraries() {
    librariesContent.style.display = "none";
  }

  helpButton.addEventListener("click", () => {
    alert("Help functionality coming soon!");
  });

  

  menuButton.addEventListener("click", () => {
    alert("Menu functionality coming soon!");
  });

  expenseTrackerButton.addEventListener("click", () => {
    setActiveItem(expenseTrackerButton);
  });

  function initExpenseTracker() {
    const balance = document.getElementById("balance");
    const money_plus = document.getElementById("money-plus");
    const money_minus = document.getElementById("money-minus");
    const form = document.getElementById("form");
    const text = document.getElementById("text");
    const amount = document.getElementById("amount");
    const incomeBtn = document.getElementById('income-btn');
    const expenseBtn = document.getElementById('expense-btn');
    const incomeList = document.getElementById('income-list');
    const expenseList = document.getElementById('expense-list');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let transactionType = 'income';

    incomeBtn.addEventListener('click', () => {
      transactionType = 'income';
      incomeBtn.classList.add('active');
      expenseBtn.classList.remove('active');
    });

    expenseBtn.addEventListener('click', () => {
      transactionType = 'expense';
      expenseBtn.classList.add('active');
      incomeBtn.classList.remove('active');
    });

    text.addEventListener('input', () => {
      text.value = text.value.replace(/[^A-Za-z\s]/g, '');
    });

    amount.addEventListener('input', () => {
      amount.value = amount.value.replace(/[^0-9.]/g, '');
    });

    form.addEventListener('submit', addTransaction);

    function addTransaction(e) {
      e.preventDefault();
      if (text.value.trim() && amount.value.trim()) {
        const transaction = {
          id: generateID(),
          text: text.value,
          amount: transactionType === 'income' ? +amount.value : -amount.value
        };
        
        transactions.push(transaction);
        updateUI();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
      }
    }

    function generateID() {
      return Math.floor(Math.random() * 1000000);
    }

    function updateUI() {
      incomeList.innerHTML = '';
      expenseList.innerHTML = '';

      transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
        listItem.innerHTML = `
          ${transaction.text} <span>₱${formatNumber(Math.abs(transaction.amount))}</span>
          <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;
        
        transaction.amount < 0 ? expenseList.appendChild(listItem) : incomeList.appendChild(listItem);
      });

      updateValues();
    }

    function updateValues() {
      const amounts = transactions.map(transaction => transaction.amount);
      const total = amounts.reduce((acc, value) => acc + value, 0).toFixed(2);
      const income = amounts.filter(value => value > 0).reduce((acc, value) => acc + value, 0).toFixed(2);
      const expense = amounts.filter(value => value < 0).reduce((acc, value) => acc + value, 0).toFixed(2);

      balance.innerText = `₱${formatNumber(total)}`;
      money_plus.innerText = `₱${formatNumber(income)}`;
      money_minus.innerText = `₱${formatNumber(Math.abs(expense))}`;
    }

    window.removeTransaction = function(id) {
      transactions = transactions.filter(transaction => transaction.id !== id);
      updateLocalStorage();
      updateUI();
    };

    function updateLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function formatNumber(number) {
      return parseFloat(number).toLocaleString('en');
    }

    function init() {
      updateUI();
    }

    init();
  }

  // Load the expense tracker on DOM ready
  initExpenseTracker();
});
