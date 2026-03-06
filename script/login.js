// console.log("Login page script loaded");
document.getElementById("signInBtn").addEventListener("click", function() {
    
    const inputName = document.getElementById("inputName").value;
    console.log("Username entered:", inputName);
    
     const inputPassword = document.getElementById("inputPassword").value;
     console.log("Password entered:", inputPassword);     
    
    if (inputName === "admin" && inputPassword === "admin123") {
        
        alert("Login successful! Redirecting to Home Page...");
        
        window.location.assign("home.html"); 
        
    } else {
       
        alert("Invalid username or password. Please try again.");
        return;
    }   
});