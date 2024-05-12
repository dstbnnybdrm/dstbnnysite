export let closetLink = document.getElementById("closet-link");
export const PADLOCK_COMBINATION = "test";

function enterCloset() {
    window.location.href = "http://" + window.location.host + "/closet/";
}

export function promptCombination() {
    if (localStorage.getItem("padlockUnlocked") === "true") {
        enterCloset();
        return;
    }

    let userInput = prompt("ENTER THE PADLOCK COMBINATION:");
    switch (userInput) {
        case PADLOCK_COMBINATION:
            localStorage.setItem("padlockUnlocked", "true");
            enterCloset();
            break;
        default:
            alert("THAT WAS THE WRONG COMBINATION");
            break;
    }
}
