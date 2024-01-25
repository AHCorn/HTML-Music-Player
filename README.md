<div align="center">

# 🎵 HTML-Music-Player 
### **简体中文** / <a href="https://github.com/AHCorn/HTML-MusicPlayer/blob/main/README_EN.md"> English </a> 

一个基于HTML编写的简洁音乐播放器

A simple music player written in HTML

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) ![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)

</div>

## 🗄 效果展示

![image](https://github.com/AHCorn/HTML-MusicPlayer/assets/42889600/c4201d5b-53fb-4215-8b85-f9ebc98deada)

<br>

## ⭐ 特性
1. 通过遵循指定格式，您可以轻松调用此播放器。
2. 将鼠标悬停在封面上并单击，即可切换播放状态。
3. 您也可以使用空格键来切换播放状态。
4. 在拖动进度条时，将显示进度预览，松手时伴有跟进效果。
<br>

## 💻 使用

首先在 HTML 文件中调用外部文件
```html
<link rel="stylesheet" href="music.css">
```

```html
<script src="music.js"></script>
```

在需要调用的位置按照以下格式输入您的音乐信息

```html
<div music Title="音乐名称" Img="封面图片.jpg" File="音乐路径"></div>
```

### 使用案例
请根据您的使用场景来选择调用的方式
#### HTML
```html
<div music Title="明日への旅路（明日的旅途）" Img="music.jpg" File="明日への旅路.mp3"></div>
```

您也可以通过该方式在静态博客所使用的 Markdown 文件中进行调用，目前已在 Hugo 测试通过。

#### VUE
```vue
<MusicPlayer title="明日への旅路（明日的旅途）" img-src="music.jpg" audio-src="明日への旅路.mp3" />
```
将 VUE 文件保存在对应路径后，您也可以使用该方式在支持 VUE 调用的程序中使用该播放器。


