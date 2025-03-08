import { signUp, logIn, logOut, onAuthStateChanged } from "./auth";
import { db } from "./config";
import { collection, getDocs, doc, deleteDoc, onSnapshot, getDoc, setDoc } from "firebase/firestore";

// Fetch a single song document
async function fetchSong() {
    const docRef = doc(db, "songs", "First Song");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Song Data: ", docSnap.data());
    } else {
        console.log("No song found");
    }
}

fetchSong();

// Fetch and display all songs
async function getSongs() {
    try {
        const songsCol = collection(db, "songs");
        const snapshot = await getDocs(songsCol);
        const songs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const songListDiv = document.getElementById("songList");
        if (!songListDiv) {
            console.error("songList div not found");
            return;
        }

        if (songs.length === 0) {
            songListDiv.innerHTML = "<p>No songs found.</p>";
            return;
        }

        let tableHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
        `;

        songs.forEach(song => {
            tableHTML += `
                <tr>
                    <td>${song.songName}</td>
                    <td>${song.artistName}</td>
                    <td>${song.songYear}</td>
                    <td>${song.songRating}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        songListDiv.innerHTML = tableHTML;
    } catch (error) {
        console.error("Error getting songs", error);
    }
}

getSongs();

// Save a song to Firestore
const saveSong = async function () {
    const songName = document.getElementById("songName").value.trim();
    const artistName = document.getElementById("artistName").value.trim();
    const songYear = parseInt(document.getElementById("songYear").value.trim());
    const songRating = parseInt(document.getElementById("songRating").value.trim());

    if (!songName || !artistName || isNaN(songYear) || isNaN(songRating)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    try {
        const songRef = doc(db, "songs", songName);
        await setDoc(songRef, {
            songName,
            artistName,
            songYear,
            songRating
        });

        alert("Your song has been saved!");
        document.getElementById("songName").value = "";
        document.getElementById("artistName").value = "";
        document.getElementById("songYear").value = "";
        document.getElementById("songRating").value = "";

        getSongs(); // Refresh the song list
    } catch (error) {
        console.log("Error saving the song", error);
    }
};

// Delete a song from Firestore
const deleteSong = async function () {
    const songName = document.getElementById("deleteSongName").value.trim();

    if (!songName) {
        alert("Please enter a song title to delete.");
        return;
    }

    try {
        const songRef = doc(db, "songs", songName);
        await deleteDoc(songRef);

        alert(`Song "${songName}" has been deleted`);
        document.getElementById("deleteSongName").value = "";
        getSongs(); // Refresh the song list
    } catch (error) {
        console.error("Error deleting the song", error);
    }
};

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.querySelector("#addSongForm");
    if (addForm) {
        addForm.addEventListener("submit", (event) => {
            event.preventDefault();
            saveSong();
        });
    } else {
        console.error("addSongForm not found");
    }

    const deleteForm = document.querySelector("#deleteSongForm");
    if (deleteForm) {
        deleteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            deleteSong();
        });
    } else {
        console.error("deleteSongForm not found");
    }
});
