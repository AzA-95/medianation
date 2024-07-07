Используем измененый swiper код(так как не коректно работает centeredSlidesBounds параметр swiper)
при малом количестве слайдов(Демо бага тут https://jsfiddle.net/0cow5xf4/) баг виден при viewport шириной
700 пикселей и ниже, при viewport 720 пикселей и выше баг в демо(https://jsfiddle.net/0cow5xf4/) исчезает

Изменение находится по линии кода 739 в файле ./swiper/shared/swiper-core.mjs

Изменение экваленты как по ссылке ниже PR
но только наши изменения(В сбилденом js коде) в файле ./swiper/shared/swiper-core.mjs
https://github.com/nolimits4web/swiper/pull/6413/commits/15dc7f4dc6991040bd3c37764898431f80a7cf45

Сделал маленький фикс с centerSlides и centeredSlidesBounds смотри код изменения в конце функции updateSlides
fix maxSnap перемной можно вынести в принципе в patch
updateSlides
