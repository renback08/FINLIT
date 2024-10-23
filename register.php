<?php
include 'connect.php';

// Function to handle login
function handleLogin($conn) {
    if (isset($_POST['email'])) {
        $email = trim($conn->real_escape_string($_POST['email']));

        // Check if the email exists in the database
        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Fetch user data
            $user = $result->fetch_assoc();

            // Email exists, redirect to lobby.php
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            header("Location: lobby.php"); // Redirect to the lobby page
            exit();
        } else {
            echo "<p style='color: red;'>No account found with that email.</p>";
        }
    } else {
        echo "<p style='color: red;'>Please enter your email.</p>";
    }
}

if (isset($_POST['rememberMe'])) {
    // Set cookie if 'Remember Me' is checked
    setcookie("email", $_POST['email'], time() + (86400 * 30), "/"); // Cookie valid for 30 days
} else {
    // Clear the cookie if not checked
    if (isset($_COOKIE['email'])) {
        setcookie("email", "", time() - 3600, "/");
    }
}

// Check if the form is submitted for login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['login'])) {
        handleLogin($conn); // Handle login
    }
}

// Close the connection
$conn->close();
?>
