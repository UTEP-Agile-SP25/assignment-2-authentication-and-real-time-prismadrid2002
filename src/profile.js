import { auth } from "./config.js";
import { db } from "./config.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Fetching profile for:", user.email);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            document.getElementById("userInfo").innerHTML = `
                <h3>Hello, ${userData.firstName} ${userData.lastName}!</h3>
                <p>Email: ${user.email}</p>
                <p>Joined: ${new Date(userData.timestamp.seconds * 1000).toLocaleDateString()}</p>
            `;
        } else {
            document.getElementById("userInfo").innerHTML = "<p>No profile data found.</p>";
        }
    } else {
        console.log("No user logged in.");
        window.location.href = "index.html"; // Redirect if not logged in
    }
});

// Logout Functionality
document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("User logged out");
        window.location.href = "index.html"; // Redirect to login page
    } catch (error) {
        console.error("Logout error:", error);
    }
});
