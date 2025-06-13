let searchBox;

const interval = setInterval(() => {
    searchBox = document.getElementById("searchbox")
    if (searchBox != undefined) {
        clearInterval(interval);

        searchBox.addEventListener("keyup", e => {
            let searchBoxInput = document.getElementById("searchbox-input")
            if (e.key == "Enter") {
                window.location = `/product-list/?search=${searchBoxInput.value}`
            }
        })
    }
}, 100)