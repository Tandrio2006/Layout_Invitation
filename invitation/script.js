document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.menu-button');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const id = entry.target.id;

                buttons.forEach(button => button.classList.remove('active'));

                const activeButton = document.querySelector(`.menu-button[onclick*="${id}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    }, {
        root: null, 
        threshold: 0.6 
    });

    sections.forEach(section => observer.observe(section));
});

function scrollToSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }

    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

var mySong = document.getElementById("mySong");
var icon = document.getElementById("icon");
var lihatUndanganBtn = document.getElementById("lihatUndanganBtn");
var songSource = document.getElementById("songSource");

var songs = ["media/song.mp3", "media/song2.mp3", "media/song3.mp3"];
var currentSongIndex = 0;
var isSongPlayedOnce = false; 

lihatUndanganBtn.onclick = function() {
    if (!isSongPlayedOnce) {
        mySong.play().catch(function(error) {
            console.log("Autoplay is blocked. User interaction needed.");
        });
        icon.src = "image/pause.png";
        isSongPlayedOnce = true; 
        icon.classList.add("rotate");
    }
};

icon.onclick = function() {
    if (mySong.paused) {
        mySong.play();
        icon.src = "image/pause.png";
        icon.classList.add("rotate");
    } else {
        mySong.pause();
        icon.src = "image/play.png";
        icon.classList.remove("rotate"); 
    }
};

mySong.addEventListener("ended", function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    songSource.src = songs[currentSongIndex];
    mySong.load();
    mySong.play();
    icon.classList.add("rotate");
});

function copyToClipboard(elementId) {
    var text = document.getElementById(elementId).innerText;
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Nomor rekening telah disalin!");
}