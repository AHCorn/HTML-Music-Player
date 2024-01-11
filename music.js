document.addEventListener('DOMContentLoaded', function () {
    var musicBlocks = document.querySelectorAll('div[music]');

    musicBlocks.forEach(function (block) {
        var title = block.getAttribute('Title');
        var imgSrc = block.getAttribute('Img');
        var audioSrc = block.getAttribute('File');

        var playerHTML = `
            <div class="player">
                <div class="cover" style="background-image: url('${imgSrc}');" >
                    <button class="playBtn">&#9658;</button>
                </div>
                <div class="song-info">
                    <div class="song-title">${title}</div>
                    <div class="progress-container">
                        <div class="preview-progress"></div>
                        <div class="progress"></div>
                    </div>
                    <div class="time">0:00 / 0:00</div>
                </div>
                <audio class="audio-player" src="${audioSrc}"></audio>
            </div>
        `;

        block.innerHTML = playerHTML;

        var audioPlayer = block.querySelector('.audio-player');
        var playBtn = block.querySelector('.playBtn');
        var progressContainer = block.querySelector('.progress-container');
        var progress = block.querySelector('.progress');
        var previewProgress = block.querySelector('.preview-progress');
        var time = block.querySelector('.time');
        var isDragging = false;

        playBtn.addEventListener('click', function () {
            togglePlayPause();
        });

        progressContainer.addEventListener('mousedown', function (e) {
            isDragging = true;
            updatePreviewProgress(e);
        });

        progressContainer.addEventListener('mousemove', function (e) {
            if (isDragging) {
                updatePreviewProgress(e);
            }
        });

        window.addEventListener('mouseup', function (e) {
            if (isDragging) {
                isDragging = false;
                setProgress(e);
            }
        });

        window.addEventListener('keydown', function (e) {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
            }
        });

        function togglePlayPause() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playBtn.innerHTML = '&#10074;&#10074;';
            } else {
                audioPlayer.pause();
                playBtn.innerHTML = '&#9658;';
            }
        }

        function updatePreviewProgress(e) {
            var width = progressContainer.clientWidth;
            var clickX = e.offsetX;
            var previewPercent = (clickX / width) * 100;
            previewProgress.style.width = previewPercent + '%';
        }

        function setProgress(e) {
            var width = progressContainer.clientWidth;
            var clickX = e.offsetX;
            var duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / width) * duration;
            updateProgress();
        }

        function updateProgress() {
            var currentTime = audioPlayer.currentTime;
            var duration = audioPlayer.duration;
            var progressPercent = (currentTime / duration) * 100;
            progress.style.width = progressPercent + '%';
            updateTimeDisplay(currentTime, duration);
        }

        function updateTimeDisplay(currentTime, duration) {
            var currentMinutes = Math.floor(currentTime / 60);
            var currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;

            var durationMinutes = Math.floor(duration / 60);
            var durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;

            time.textContent = currentMinutes + ':' + currentSeconds + ' / ' + durationMinutes + ':' + durationSeconds;
        }

        audioPlayer.addEventListener('timeupdate', updateProgress);
    });
});
