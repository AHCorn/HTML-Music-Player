<div align="center">

# 🎵 HTML-MusicPlayer 
###  <a href="https://github.com/AHCorn/HTML-MusicPlayer">简体中文</a> / English  

A simple music player written in HTML

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) ![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)

</div>

## 🗄 Music Player Demo

![image](https://github.com/AHCorn/HTML-MusicPlayer/assets/42889600/c4201d5b-53fb-4215-8b85-f9ebc98deada)

<br>

## ⭐ Features
1. Easily invoke this player by following the specified format.
2. Hover the mouse over the cover and click to toggle the play status.
3. You can also use the spacebar to toggle the play status.
4. While dragging the progress bar, a progress preview will be displayed, and when released, it is accompanied by a follow-up effect.
<br>

## 💻 Usage
First, call external files in your HTML file:
```html
<link rel="stylesheet" href="music.css">
```

```html
<script src="music.js"></script>
```

Enter your music information in the following format where you want to invoke it:

```html
<div music Title="Music Name" Img="cover image.jpg" File="music path"></div>
```

### Usage Example
Choose the method of invocation according to your use case.
#### HTML
```html
<div music Title="明日への旅路（Journey to Tomorrow）" Img="music.jpg" File="明日への旅路.mp3"></div>
```
You can also invoke it in this way in Markdown files used in static blogs, already tested and working with Hugo.
#### VUE
```vue
<MusicPlayer title="明日への旅路 (Journey to Tomorrow)" img-src="music.jpg" audio-src="明日への旅路.mp3" />
```
After saving the VUE file in the corresponding path, you can use this player in programs that support VUE invocation.


