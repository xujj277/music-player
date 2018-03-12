


var currentIndex = 0
var musicList =[]
var audio = new Audio()
// audio.autoplay =  true //一旦获得对象就自动播放

function $(selector) {
	return document.querySelector(selector)
}


getMusicList(function(list){
	musicList = list
	loadMusic(list[currentIndex])
	setPlaylist(list)
})
	

//获取音乐菜单添加至li到节点
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

//点击播放列表某一项就播放其中的歌曲。将时间代理绑定到父元素上
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






//修改歌曲的内容,给相应歌曲加入选中选项的白条
function loadMusic(musicObj){
	audio.src = musicObj.src
	$('.info .title').innerText = musicObj.title
	$('.info .author').innerText = musicObj.author
	$('.cover').style.backgroundImage = 'url(' + musicObj.img  + ')'
	$('.img').style.backgroundImage = 'url(' + musicObj.img  + ')'
	for(var i = 0; i < $('.box .list').children.length; i++){
		$('.box .list').children[i].classList.remove('playing')
		$('.box .list').children[currentIndex].classList.add('playing')
	}

}

//进度条的设置
audio.ontimeupdate = function(){

	$('.bar .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
}

$('.progress .bar').onclick = function(e){
	var percent = e.offsetX / parseInt(getComputedStyle(this).width)
	audio.currentTime = audio.duration * percent
}


//时间的设置
audio.onplay = function(){
	clock = setInterval(function(){
		var min = Math.floor(audio.currentTime/60)
		var sec = Math.floor(audio.currentTime)%60 + ''
		sec = sec.length === 2 ? sec : '0' + sec
		$('.progress .time').innerText = min + ':' + sec
	},1000)
}

audio.onpause = function(){
	clearInterval(clock)
}

audio.onended = function(){
	currentIndex = (++currentIndex)%musicList.length
	loadMusic(musicList[currentIndex])
	audio.play()
}

//暂停和播放键的转换
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


//上一首与下一首的转换
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
}






//获取音乐数据
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


// //皮肤颜色随机
// function getRandColor(){
// 	function random(a,b){
// 		return Math.floor(Math.random()*(b - a + 1) + a)
// 	}
// 	var arr = ''
// 	var dict = '0123456789abcdef'
// 	for(var i = 0; i < 6; i ++){
// 		arr += dic[random(0,15)]
// 	}
// 	return '#'+arr
// }
// var color 





