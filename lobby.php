<?php
session_start(); // Start the session
include("connect.php");

?>


<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financial Information Management System</title>
    <link rel="stylesheet" href="lobby.css">
  </head>
  <header>
      <div class="header-left">
        <button id="menuButton" class="menu-btn">☰</button>
        <span class="title">FINLIT PATH: FINANCIAL INFORMATION MANAGEMENT SYSTEM</span>
      </div>
      <div class="header-right">
            <span>Welcome!</span>
            <button id="helpButton" class="icon-btn">❓</button>
            <div class="dropdown">
                <button id="settingsButton" class="icon-btn">⚙️</button>
                <div id="settingsDropdown" class="dropdown-content">
                    <button id="profileButton">Profile</button>
                    <button id="themeToggle">Light/Dark Mode</button>
                    <button id="logoutButton">Log Out</button>
                </div>
            </div>
            <span class="user-role">STUDENT</span>
        </div>
    </header>

    <main>
      <nav class="sidebar">
        <button class="sidebar-item active">Dashboard</button>
        <button class="sidebar-item" id="expenseTrackerButton">Real-Time Expense Tracker</button>
        <button id="assessmentButton" class="sidebar-item has-submenu">Assessments</button>
        <div class="submenu">
          <button class="sidebar-item sub-item">Module 1</button>
          <button class="sidebar-item sub-item">Module 2</button>
        </div>
        <button class="sidebar-item">Libraries</button>
        <div class="content" id="librariesContent" style="display: none;">
          <h2>Libraries</h2>
          <div class="library-icons">
              <div class="library-item">
                  <img src="path/to/icon1.png" alt="Study Guide 1" class="large-icon">
                  <p>Study Guide 1</p>
              </div>
              <div class="library-item">
                  <img src="path/to/icon2.png" alt="Study Guide 2" class="large-icon">
                  <p>Study Guide 2</p>
              </div>
              <!-- Add more items as needed -->
          </div>
      </div>
        <button class="sidebar-item">News and Updates</button>
      </nav>
      
      <section class="content" id="contentArea">
            

        <div id="expenseTrackerContent" style="display: none;">
          <h2>Expense Tracker</h2>
          <div class="expense-tracker-container">
            <div class="left-column">
              <h4>Your Balance</h4>
              <h1 id="balance">₱0.00</h1>
              <div class="inc-exp-container">
                <div>
                  <h4>Income</h4>
                  <p id="money-plus" class="money-plus">+₱0.00</p>
                </div>
                <div>
                  <h4>Expense</h4>
                  <p id="money-minus" class="money-minus">-₱0.00</p>
                </div>
              </div>
              <h3>Add New Transaction</h3>
              <form id="form">
                <div class="form-control">
                  <label for="text">Text</label>
                  <input type="text" id="text" placeholder="Enter Text...." pattern="[A-Za-z\s]+" required/>
                </div>
                <div class="form-control">
                  <label for="amount">Amount</label>
                  <input type="number" id="amount" placeholder="Enter amount..." step="0.01" min="0" required>
                  <div class="button-container">
                    <button type="button" id="income-btn" class="type-btn income-btn">Income</button>
                    <button type="button" id="expense-btn" class="type-btn expense-btn">Expense</button>
                  </div>
                </div>
                <button type="submit" class="btn">Add transaction</button>
              </form>
            </div>
            <div class="right-column">
              <h3>History</h3>
              <div class="history-container">
                <div class="history-column">
                  <h4>Income</h4>
                  <ul id="income-list" class="list"></ul>
                </div>
                <div class="history-column">
                  <h4>Expenses</h4>
                  <ul id="expense-list" class="list"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <button class="footer-item">Home</button>
      <button class="footer-item">Status</button>
      <button class="footer-item">Notification</button>
      <button class="footer-item">More</button>
    </footer>

    <script src="lobby.js"></script>
  </body>
  </html>