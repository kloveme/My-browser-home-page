document.addEventListener("DOMContentLoaded" , function () {
    var UserSearchInformation = document.getElementById("SearchInformation");
    var UserStartSearchButton = document.getElementById("SearchButton");
    var UserTime = document.getElementById("UserTime");
    var UserTimeMessage = document.getElementById("UserTimeMessage");
    var UserSaveImage = localStorage.getItem("wallpaper");
    document.body.style.backgroundImage = UserSaveImage;
    updateTime(UserTime, UserTimeMessage);
    setInterval(() => {
        updateTime(UserTime, UserTimeMessage);
    }, 1000);
    UserStartSearchButton.addEventListener("click" , function () {
       VerifySearchInofrmation(UserSearchInformation , UserStartSearchButton);
    });
    UserSearchInformation.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            VerifySearchInofrmation(UserSearchInformation, UserStartSearchButton);
        }
    });
    document.addEventListener("keydown" , function (e_) {
        if (e_.altKey && (e_.key == "w")) {
            e_.preventDefault();
            OpenChangeWallpaperWindow();
        }
    });
    document.addEventListener("keydown" , function (fastSearch) {
        if (fastSearch.altKey && (fastSearch.key == "r")) {
            fastSearch.preventDefault();
            OpenFastSearchWindow();
        }
    });
});

function OpenFastSearchWindow() {
    var UserStartSearchButton = document.getElementById("SearchButton");
    var FastSearchWindowElement = document.getElementById("FastSearchWindow");
    var FastSearchInformtaionElement = document.getElementById("FastSearchInformation");
    FastSearchWindowElement.style.display = "flex";
    FastSearchWindowElement.classList.add("open-fastsearch-window");
    FastSearchInformtaionElement.focus();
    document.addEventListener("keydown" , function (keyword) {
        if (keyword.key == "Enter") {
            var FastSearchInformationValue = FastSearchInformtaionElement.value;
            if (FastSearchInformationValue == "") {
                DisplayErrorMessage(UserStartSearchButton , "Please write search word");
                return;
            }
            const FastSearchInformationValueCleanTrim = FastSearchInformationValue.trim();
            
              if (FastSearchInformationValueCleanTrim.startsWith("http://") 
                || FastSearchInformationValueCleanTrim.startsWith("https://")) {
                    window.location.href = FastSearchInformationValueCleanTrim;
                    return;
            }
            var SearchURL = "https://cn.bing.com/search?pc=MOZI&form=MOZLBR&q=" + 
                FastSearchInformationValueCleanTrim;
                window.location.href = SearchURL;
            }
    });

    document.addEventListener("keydown" , function (CloseWord) {
        if (CloseWord.key == "Escape") {
            setTimeout(() => {
            FastSearchWindowElement.classList.add("close-fastsearch-window");
                setTimeout(() => {
                    FastSearchWindowElement.classList.remove("close-fastsearch-window");
                    FastSearchWindowElement.classList.remove("open-fastsearch-window");
                    FastSearchWindowElement.style.display = "none";
                    return;
                }, 1000);
            }, 800);
        }
    });
}

function OpenChangeWallpaperWindow() {
    var ChangeWallpepWindowElement = document.getElementById("ChangeWallpaperWindow");
    var ApplayButtonElement = document.getElementById("ApplyChangeWallpaper");
    var UpdateWallpaperFileButton = document.getElementById("UpdateWallpaper");
    var WallPaperImg = document.querySelectorAll(".ChangeWallpaperWindow-WallpaperImageView-ViewList-img");
    var CurrentSelectWallpeprImageSrc;
    ChangeWallpepWindowElement.style.display = "flex";
    ChangeWallpepWindowElement.classList.add("open-change-window");
    UpdateWallpaperFileButton.addEventListener("click" , function(){
        document.getElementById("UpdateWallpaperEntry").click();
        document.getElementById("UpdateWallpaperEntry").addEventListener("change" , function (file_) {
            var UpdateFile = file_.target.files[0];
            var ReaderFile = new FileReader();
            ReaderFile.onload = function(event) {
                var ImageUrl = event.target.result;
                var UserSelecedWallpaperURL = "url('" + ImageUrl + "')";
                ApplayButtonElement.addEventListener("click" , function () {
                if (UserSelecedWallpaperURL == "") {
                    DisplayErrorMessage(ApplayButtonElement , "Please click wallpaper");
                    return;
                }
                    document.body.style.backgroundImage = UserSelecedWallpaperURL;
                    localStorage.clear();
                    localStorage.setItem("wallpaper",UserSelecedWallpaperURL);   
                });
            }; 
            ReaderFile.readAsDataURL(UpdateFile);
            return;
        });
       
    });

    WallPaperImg.forEach(function (ImagesIndex) {
        ImagesIndex.addEventListener("click" , function () {
            ImagesIndex.style.border = "2px solid #ffff";
            CurrentSelectWallpeprImageSrc = ImagesIndex.src;
        });   
        ApplayButtonElement.addEventListener("click" , function () {
            if (CurrentSelectWallpeprImageSrc == "") {
                DisplayErrorMessage(ApplayButtonElement , "Please click wallpaper");
                return;
            }
            if (CurrentSelectWallpeprImageSrc) {
                ImagesIndex.style.border = "none";
                var BackgroundImageUrl = "url('" + CurrentSelectWallpeprImageSrc + "')";
                document.body.style.backgroundImage = BackgroundImageUrl;
                localStorage.clear();
                localStorage.setItem( "wallpaper" , BackgroundImageUrl);
                return;
            }
        });
    });

    document.addEventListener("keydown" , function (e_) {
        if (e_.key == "Escape") {
            e_.preventDefault();
            setTimeout(() => {
                ChangeWallpepWindowElement.classList.add("close-change-window");
                setTimeout(() => {
                    ChangeWallpepWindowElement.classList.remove("open-change-window");
                    ChangeWallpepWindowElement.classList.remove("close-change-window");
                    ChangeWallpepWindowElement.style.display = "none";
                    return;
                }, 1000);
            }, 800);
        }
    });
}

function VerifySearchInofrmation(UserSearchInformation , UserStartSearchButton) {
    var UserSearchInformationValue = UserSearchInformation.value;
    if (UserSearchInformationValue === "") {
        DisplayErrorMessage(UserStartSearchButton , "Plaease write search word");
        return;
    }
    const UserSearchInformationValueCleanTrim = UserSearchInformationValue.trim();
    if (UserSearchInformationValueCleanTrim.startsWith("http://") 
        || UserSearchInformationValueCleanTrim.startsWith("https://")) {
            window.location.href = UserSearchInformationValueCleanTrim;
            return;
    }
    var SearchURL = "https://cn.bing.com/search?pc=MOZI&form=MOZLBR&q=" + 
        UserSearchInformationValueCleanTrim;
        window.location.href = SearchURL;        
}

function updateTime(UserTime , UserTimeMessage) {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var timeString = hours + ":" + minutes + ":" + seconds;
    UserTime.innerText = timeString;
    var greeting = "";
    if (hours >= 5 && hours < 12) {
        greeting = "Good morning!";
    } else if (hours >= 12 && hours < 14) {
        greeting = "Good afternoon!";
    } else if (hours >= 14 && hours < 18) {
        greeting = "Good afternoon!";
    } else if (hours >= 18 && hours < 22) {
        greeting = "Good evening!";
    } else {
        greeting = "It's late at night, go to bed early 💤️";
    }
    UserTimeMessage.innerText = greeting;
}


function DisplayErrorMessage(Button, ErrorMessage) {
    var ErrorWindowElement = document.getElementById("ErrorWindow");
    var ErrorMessageElement = document.getElementById("ErrorMessage");
    Button.disabled = true;
    ErrorMessageElement.innerText = ErrorMessage;
    ErrorWindowElement.classList.add("open-window-animation");
    ErrorWindowElement.style.display = "flex";
    setTimeout(() => {
        ErrorWindowElement.classList.add("close-window-animation");
        setTimeout(() => {
            ErrorWindowElement.classList.remove("close-window-animation");
            ErrorWindowElement.classList.remove("open-window-animation");
            ErrorWindowElement.style.display = "none";
            Button.disabled = false;
        }, 500);
    }, 3000);
}