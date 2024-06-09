export let closetLink = document.getElementById("closet-link");
export const PADLOCK_COMBINATION = "509";

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
        // user cancels
        case null:
            alert("I'LL STILL BE HERE.");
            break;
        // user inputs nothing
        case "":
            alert("UH, YOU DIDN'T TYPE ANYTHING. TRY AGAIN.");
            promptCombination();
            break;
        // user is correct
        case PADLOCK_COMBINATION:
            localStorage.setItem("padlockUnlocked", "true");
            enterCloset();
            break;
        // user is wrong
        default:
            alert("INCORRECT COMBINATION.");
            break;
    }
}
