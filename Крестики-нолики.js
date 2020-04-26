var twoPlayers = true;
var exMove = true;
changeLight(exMove)


document.querySelectorAll(".cell").forEach(item => {
	item.addEventListener("click",function(elem){
		if (twoPlayers) {

			let element = elem.toElement
			if (element.className.indexOf("ex")===-1 && element.className.indexOf("circle")===-1) {
				if (exMove) {
					element.classList.add("ex");
					changeMove()
					ifWin()
					ifDraw()
				}
				else {
					element.classList.add("circle");
					changeMove()
					ifWin()
					ifDraw()
				}
			}

		} else {
			let element = elem.toElement
			if (element.className.indexOf("ex")===-1 && element.className.indexOf("circle")===-1) {
				element.classList.add("ex");
				ifWin()
				ifDraw()
				computerMove()
				ifWin()
				ifDraw()
			}
		}
	})
})

function ifWin () {
	let arr = [
	[0,1,2],
	[0,4,8],
	[0,3,6],
	[1,4,7],
	[2,4,6],
	[2,5,8],
	[3,4,5],
	[6,7,8]
	];
	let elemArr = document.querySelectorAll(".cell");
	let classArr = ["circle","ex"]
	for(let y = 0;y<arr.length;y++) {
		for(let i = 0;i<classArr.length;i++) {	
			if (elemArr[arr[y][0]].className.indexOf(classArr[i]) !== -1 && elemArr[arr[y][1]].className.indexOf(classArr[i]) !== -1 && elemArr[arr[y][2]].className.indexOf(classArr[i]) !== -1) {
				return Win(classArr[i])
			}
		}
	}
}
	// определяет победу, увеличивает счет, запускает очистку поля
	function Win (name) {
		console.log(document.querySelectorAll(".cell"))
		if (name ==="ex") {
			document.querySelector(".score-left").innerText = Number(document.querySelector(".score-left").innerText) + 1
			clearBoard()
		}
		if (name ==="circle") {
			document.querySelector(".score-right").innerText = Number(document.querySelector(".score-right").innerText) + 1
			clearBoard()
		}
	}



	// проверяет если все поля заполнены, вызывает с таймаутом очистку классов
	function ifDraw () {
		let arr = [];
		document.querySelectorAll(".cell").forEach(item=> {
			if(item.className.indexOf("ex") !== -1 || item.className.indexOf("circle") !== -1) {
				arr.push(item)
			}
		})
		if(arr.length === 9) {
			setTimeout(clearBoard,500)
		}

	}
	
	// чистит поле от иксов и нулей
	function clearBoard () {
		document.querySelectorAll(".cell").forEach(item => {
			item.classList.remove("ex")
			item.classList.remove("circle")
		})
	}


	// определяет чей ход
	function changeMove () {
		if(exMove) {
			exMove = false;
			changeLight(false)
			return
		} 
		exMove = true;
		changeLight(true)
		return
	}

// меняет подсветку колонок по краям
function changeLight (flag) {
	if (flag) {
		document.querySelector(".left-col").classList.add("active")
		document.querySelector(".right-col").classList.remove("active")
	}
	else {
		document.querySelector(".right-col").classList.add("active")
		document.querySelector(".left-col").classList.remove("active")
	}
}
function resetScore () {
	document.querySelector(".score-left").innerText = 0
	document.querySelector(".score-right").innerText = 0
}



// 1 игрок 


// переключение режима игры, вызывает очистку поля, очистку счета
document.querySelector(".mode-two-players").addEventListener("click",function(elem){
	elem.toElement.classList.add("mode-shadow");
	document.querySelector(".mode-one-player").classList.remove("mode-shadow");
	clearBoard()
	resetScore()
	exMove = true
	changeLight(true)
	twoPlayers = true
})
// переключение режима игры, вызывает очистку поля, очистку счета
document.querySelector(".mode-one-player").addEventListener("click",function(elem){
	elem.toElement.classList.add("mode-shadow");
	document.querySelector(".mode-two-players").classList.remove("mode-shadow");
	clearBoard()
	resetScore()
	exMove = true
	changeLight(true)
	twoPlayers = false
})

	// искуственный интелект выдающий ход в рандом из оставшихся клеток
	function computerMove() {
		let arr2 = []
		document.querySelectorAll(".cell").forEach(item=> {
			if( item.className.indexOf("ex")===-1 && item.className.indexOf("circle")===-1) {
				arr2.push(item)
			}
		});
		let random = Math.floor(Math.random()*arr2.length)
		if (arr2.length>0) {arr2[random].classList.add("circle")}
	}