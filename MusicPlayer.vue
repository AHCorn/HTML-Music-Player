<template>
    <div class="player">
        <div class="cover" :style="{ backgroundImage: 'url(' + imgSrc + ')' }">
            <button class="playBtn" @click="togglePlayPause">{{ playBtnText }}</button>
        </div>
        <div class="song-info">
            <div class="song-title">{{ title }}</div>
            <div class="progress-container" @mousedown="updatePreviewProgressOnDown"
                @mousemove="updatePreviewProgressOnMove">
                <div class="preview-progress" ref="previewProgress"></div>
                <div class="progress" ref="progress"></div>
            </div>
            <div class="time">{{ timeText }}</div>
        </div>
        <audio class="audio-player" :src="audioSrc" @timeupdate="updateProgress" ref="audioPlayer"></audio>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

const { title, imgSrc, audioSrc } = defineProps(["title", "imgSrc", "audioSrc"]);

const paused = ref(true);
const timeText = ref("0:00 / 0:00");
const playBtnText = ref("►");
const audioPlayer = ref<HTMLAudioElement | null>(null);
const progress = ref<HTMLDivElement | null>(null);
const previewProgress = ref<HTMLDivElement | null>(null);

let isDragging = false

onMounted(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);
})

const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
        isDragging = false;
        setProgress(e);
    }
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
    }
};


const togglePlayPause = () => {
    if (paused.value) {
        audioPlayer.value?.play();
    } else {
        audioPlayer.value?.pause();
    }
    paused.value = !paused.value;
    playBtnText.value = paused.value ? "►" : "❚❚";
};

const updatePreviewProgress = ({ offsetX, target }: MouseEvent) => {
    if (!previewProgress.value) return;
    const width = (target as HTMLDivElement).clientWidth;
    const previewPercent = (offsetX / width) * 100;
    previewProgress.value.style.width = `${previewPercent}%`;
};

const updatePreviewProgressOnDown = (e: MouseEvent) => {
    isDragging = true;
    updatePreviewProgress(e);
};

const updatePreviewProgressOnMove = (e: MouseEvent) => {
    if (isDragging) updatePreviewProgress(e);
};

const updateTimeDisplay = (currentTime = 0, duration = 0) => {
    const formatTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    timeText.value = `${formatTime(currentMinutes)}:${formatTime(
        currentSeconds
    )} / ${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
};


const updateProgress = () => {
    if (!audioPlayer.value || !progress.value) return;

    const { duration, currentTime } = audioPlayer.value;

    if (duration && currentTime) {
        const progressPercent = (currentTime / duration) * 100;
        progress.value.style.width = `${progressPercent}%`;
    }

    updateTimeDisplay(currentTime, duration);
};

const setProgress = (e: MouseEvent) => {
    if (!audioPlayer.value) {
        return
    }
    let width = (e.target as HTMLDivElement).clientWidth
    let clickX = e.offsetX
    let duration = audioPlayer.value?.duration
    if (!duration) {
        return
    }
    audioPlayer.value.currentTime = (clickX / width) * duration
    updateProgress()
}


</script>

<style scoped>
.player {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    max-width: 350px;
    font-family: Arial, sans-serif;
}

.cover {
    position: relative;
    width: 60px;
    height: 60px;
    background-size: cover;
    background-position: center;
    border-radius: 30px;
    margin-right: 15px;
    overflow: hidden;
    cursor: pointer;
}

.cover::after,
.playBtn {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cover:hover::after,
.cover:hover .playBtn {
    opacity: 1;
}

.cover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.playBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
    font-size: 1.5em;
    color: #ffffff;
    cursor: pointer;
    z-index: 2;
}

.song-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.song-title {
    font-size: 0.9em;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
}

.progress-container {
    width: 100%;
    height: 3px;
    background: #ddd;
    border-radius: 1.5px;
    cursor: pointer;
    position: relative;
}

.progress,
.preview-progress {
    height: 100%;
    border-radius: 1.5px;
    position: absolute;
    left: 0;
    top: 0;
}

.progress {
    background: #007bff;
    width: 0%;
    transition: width 0.3s ease;
}

.preview-progress {
    background: rgba(0, 123, 255, 0.5);
    width: 0%;
}

.time {
    font-size: 0.75em;
    color: #666;
    margin-top: 8px;
}
</style>