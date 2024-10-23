<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="wrapper">
        <div class="title-text">
            <div class="title login active">Login Form</div>
            <div class="title signup">Signup Form</div>
        </div>
        <div class="form-container">
            <div class="form-inner">
                <form action="register.php" method="POST" class="login">
    <input type="hidden" name="login" value="true">
    <div class="field-container">
        <div class="field">
            <input type="text" name="email" placeholder="Email Address" required id="loginEmail" value="<?php echo isset($_COOKIE['email']) ? $_COOKIE['email'] : ''; ?>">
            <small class="error-message" id="emailError"></small>
        </div>
    </div>
    <div class="field-container">
        <div class="field">
            <input type="password" name="password" placeholder="Password" required id="loginPassword">
            <small class="error-message" id="passwordError"></small>
        </div>
    </div>
    <div class="field remember-me">
        <input type="checkbox" name="rememberMe" id="rememberMe">
        <label for="rememberMe">Remember Me</label>
    </div>
    <div class="pass-link"><a href="#">Forgot password?</a></div>
    <div class="field">
        <input type="submit" value="Login">
    </div>
    <div class="signup-link">Not a Member? <a href="signup.php">Signup Now</a></div>
</form>
            </div>
        </div>
    </div>
    <script src="login.js"></script> <!-- Separated JS file -->
</body>
</html>
