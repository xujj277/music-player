# music-player功能介绍

- 本播放器能够经行“播放”，“暂停”，“下一首”，“上一首”的功能。
- 还可以点击菜单中的歌曲经行“切歌”功能。
- 歌曲结束，会自动切换到下一首，并且换背景图片和封面图片。

1. 首先要获取音乐的数据用的ajax方法
```
function getMusicList(callback) {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', '/music.json', true)
	xhr.onload = function(){
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){

			callback(JSON.parse(this.responseText))
		}else {
			console.log('获取数据失败')
		}
	}
	xhr.onerror = function(){
		console.log('网络异常')
	}
	xhr.send()
}
```

2. 暂停和播放键的转换
```
$('.icon .play').onclick = function(){
	if(audio.paused){
		audio.play()
		this.querySelector('.fa').classList.remove('fa-play-circle')
		this.querySelector('.fa').classList.add('fa-pause')
	}else{
		audio.pause()
		this.querySelector('.fa').classList.add('fa-play-circle')
		this.querySelector('.fa').classList.remove('fa-pause')
	}
}
```

3. 上一首与下一首的转换,并且要调取相应的歌曲项目
```
$('.icon .forward').onclick = function(){
	currentIndex = (++currentIndex)%musicList.length

	loadMusic(musicList[currentIndex])
	if($('.icon .play').querySelector('.fa').classList.contains('fa-pause')){
		audio.play()
	}else{
		audio.pause()
	}
}
$('.icon .backward').onclick = function(){
	currentIndex = (musicList.length + (--currentIndex)) % musicList.length

	loadMusic(musicList[currentIndex])
	if($('.icon .play').querySelector('.fa').classList.contains('fa-pause')){
		audio.play()
	}else{
		audio.pause()
	}
```

4. 进度条的设置和 时间的设置，要进行简单的数学逻辑的运算。
```
audio.ontimeupdate = function(){

	$('.bar .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
}

$('.progress .bar').onclick = function(e){
	var percent = e.offsetX / parseInt(getComputedStyle(this).width)
	audio.currentTime = audio.duration * percent
}
audio.onplay = function(){
	clock = setInterval(function(){
		var min = Math.floor(audio.currentTime/60)
		var sec = Math.floor(audio.currentTime)%60 + ''
		sec = sec.length === 2 ? sec : '0' + sec
		$('.progress .time').innerText = min + ':' + sec
	},1000)
}
```

5. 获取音乐菜单添加li到dom节点，点击播放列表某一项就播放其中的歌曲。将时间代理绑定到父元素上，冒泡处理。
```
function setPlaylist(musiclist){
	var container = document.createDocumentFragment()
	musiclist.forEach(function(musicObj){
		var node = document.createElement('li')
		node.innerText = musicObj.title + '---' + musicObj.author
		console.log(node)
		container.appendChild(node)
	})
	$('.box .list').appendChild(container)
}
$('.box .list').onclick = function(e){
	if(e.target.tagName.toLowerCase() === 'li'){
		for(var i = 0; i < this.children.length; i++){
			if(this.children[i] === e.target){
				currentIndex = i
			}
		}
		console.log(currentIndex)
		loadMusic(musicList[currentIndex])
		if($('.icon .play').querySelector('.fa').classList.contains('fa-pause')){
			audio.play()
	}else{
			audio.pause()
		}
	}
}
```

### 效果页面展示

![](http://ww1.sinaimg.cn/large/a0293cd1gy1fpa5x0nv8rj20jx0fjgm9.jpg)
![](http://ww1.sinaimg.cn/large/a0293cd1gy1fpa5xnd6krj20ib0cxgme.jpg)