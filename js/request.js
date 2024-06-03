// api
const API = "https://randomuser.me/api/?results=9";

// for leader
const overlay = document.getElementById("overlay");

const loaderToggle = (toogle) => {
    if (toogle) {
        overlay.classList.remove("hidden");
    } else {
        overlay.classList.add("hidden");
    }
};

const getData = (resource) => {
    return new Promise((resolve, rejects) => {
        const request = new XMLHttpRequest();

        request.addEventListener("readystatechange", () => {
            if (request.readyState < 4) {
                // loaderToggle(true);
            } else if (request.readyState == 4 && request.status == 200) {
                const data = JSON.parse(request.responseText);
                resolve(data.results);
                // loaderToggle(false);
            } else if (request.request == 4) {
                rejects("Error!!!");
                // loaderToggle(false);
            }
        });
        request.open("GET", resource);
        request.send();
    });
};

const reload = () => {
    getData(API)
        .then((data) => {
            updateUI(data);
        })
        .catch((err) => {
            console.log(err);
        });
};

document.addEventListener("DOMContentLoaded", reload());
