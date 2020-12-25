let wrap = document.querySelector(".wrap");

// Класс DoBox - конструктор блоков с классом "box"
	class DoBox {
		constructor(){		

		}		
			makediv(bgImgLeft, bgImgRight){			
			this.divBox = document.createElement('div');
			wrap.append(this.divBox);
			this.divBox.className = "box";			
					

			this.bgImgLeft = bgImgLeft; 
			this.divLeftImg = document.createElement('div');
			this.divBox.append(this.divLeftImg);
			this.divLeftImg.className = "left_img";
			this.divLeftImg.style.backgroundImage = this.bgImgLeft;
				

			this.bgImgRight = bgImgRight;
			this.divRightImg = document.createElement('div');
			this.divBox.append(this.divRightImg);
			this.divRightImg.className = "right_img";
			this.divRightImg.style.backgroundImage = this.bgImgRight;			
			
			}		
		
	}

//Чтобы добавить блок-слайд вызываем метод makediv("путь к левому фото", 
//"путь к правому фото"). Все фото подготавливаются одного размера заранее
//В данном примере 640х400 см.стили
	let box = new DoBox();
	box.makediv('url(img/1.jpg)', 'url(img/2.jpg)');	
	box.makediv('url(img/3.jpg)', 'url(img/4.jpg)');
	box.makediv('url(img/5.jpg)', 'url(img/6.jpg)');



	
// Изменение размеров левого фото
let rng = document.querySelector('.rng');
// Поверх фото находится инпут тип range с классом '.rng'. При изменении положения движка
//вызывается функция change
rng.addEventListener('input', change);
//Выбираем всю коллекцию фото в левом блоке (range одновременно меняет ширину у всех левых фото, 
// (для простоты) для этого в функции change запускаем перебор коллекции левых фото)
let divLeftImgAll = document.querySelectorAll('.left_img');

//Для работы функции change вычислим ширину фото слева(достаточно первого)
let fotoLeft = document.querySelector('.left_img');
const fotoLeftWidth = fotoLeft.clientWidth;

	function change(){

				for(let img of divLeftImgAll){

				leftW = +rng.value+fotoLeftWidth;// переменная, в которую записывается начальное
				//положение движка input range(rng.value + значение половины ширины 
				//фото, для синхронности движения input range и правой границы фотографии)
				// и ниже - ширина левого фото равна значению положения движка
				
				img.style.width = leftW+'px';
				img.style.transition = '.3s';
				}
			}


// 
			
			
//----переходы между слайдами по стрелкам вправо влево

let btn_right = document.querySelector('.arrow_right');
btn_right.addEventListener('click', plus);
let btn_left = document.querySelector('.arrow_left');
btn_left.addEventListener('click', minus);

let boxes = document.querySelectorAll('.box');
let count = 0;
boxes[0].className = 'box visible';

//Делаем доты-----------
let boxDot = document.querySelector('.box_dot');
boxDot.style.display = 'flex';
boxDot.style.justifyContent = 'center';

for(let amt =0 ; amt < boxes.length; amt++){	
	divDot = document.createElement('div');
	boxDot.append(divDot);
	divDot.className = "dot";
	divDot.id = amt;
	divDot.style.borderRadius = '50%';
	divDot.style.backgroundColor = '#D2D2D2';	
	divDot.style.width = '15px';
	divDot.style.height = '15px';
	divDot.style.marginLeft = '5px';
}
//выберем все доты чтобы потом в plus minus их подкрашивать 
//и анимировать
//(алгоритм тот же что и переходы между слайдами)
let divDots = document.querySelectorAll('.dot');

//Первый дот сделаем темнее (активный)
divDots[0].style.backgroundColor = '#58CDB1';
//console.log(boxes.length);


function plus(){
	reset()
	//Доты - окрашивание активных и анимация
	divDots[count].style.backgroundColor = '#D2D2D2';
	divDots[count].style.animation = 'none';
	// делаем box'ы видимыми
    boxes[count].classList.remove('visible');
	if(count < boxes.length-1){		
		count++;
		boxes[count].classList.add('visible');
		
		divDots[count].style.backgroundColor = '#58CDB1';
		divDots[count].style.animation = 'anidot .5s';
				
		
	}else{
		count = 0;		
		boxes[count].classList.add('visible');
		divDots[count].style.backgroundColor = '#58CDB1';
		divDots[count].style.animation = 'anidot .5s';
	}	
}
function minus(){
	reset()
	
	divDots[count].style.backgroundColor = '#D2D2D2';
	divDots[count].style.animation = 'none';

    boxes[count].classList.remove('visible');
	if(count <= 0){		
		count = boxes.length;
		count--;
		boxes[count].classList.add('visible');
		divDots[count].style.backgroundColor = '#58CDB1';
		divDots[count].style.animation = 'anidot .5s';		
		
	}else{
		count--;		
		boxes[count].classList.add('visible');
		divDots[count].style.backgroundColor = '#58CDB1';
		divDots[count].style.animation = 'anidot .5s';
	}	
}

 //сброс ширины левой картинки и положения input range после пролистывания слайдера
function reset(){
	for(let img of divLeftImgAll){
				rng.value = 0;
				leftW = +rng.value + fotoLeftWidth;					
				img.style.width = leftW+'px';
				img.style.transition = '.3s';
			}
}

// переходы к слайдам по клику на доты (ПОКА НЕ РАБОТАЕТ)
// boxDot.addEventListener('click', shiftDot);

// function shiftDot(){	
// 	reset()	
// 	if(event.target.className = 'dot'){
// 		for(let box of boxes){			
// 			box.classList.remove('visible');
// 		}
// 		for(let dot of divDots){
// 			dot.style.backgroundColor = '#D2D2D2';
// 			dot.style.animation = 'none'; 
// 		}			
		
// 		boxes[event.target.id].classList.add('visible');		
// 		divDots[event.target.id].style.backgroundColor = 'grey';
// 		divDots[event.target.id].style.animation = 'anidot .5s';
// 		}
		
		
// 	}	
	



