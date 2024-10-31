async function goSearch(value, page) {
	const resp = await fetch(
		`https://pixabay.com/api?key=46268132-9b4ac1a47ae5c9f91ba4a44d1&q=${value}&page=${page}&per_page=3`
	);

	const data = await resp.json();
	return data.hits.map((image) => image.largeImageURL);
}

async function changeImg(page, idxImage, images, load = false) {
	let url;
	console.log(load, "load");
	if (load) {
		console.log(load);
		const urls = await goSearch(input.value, page);
		images.push(...urls); // сохранить urls в массив хранилище

		console.log(images);

		url = images[idxImage];
	} else {
		url = images[idxImage];
		// достаем из хранилища картинку по текущему индесу
	}
	// const img = document.createElement("img");
	const img = document.querySelector(".about__item-image");
	img.src = url;
	console.log(url);
	console.log(img);
	// document.body.append(img);
}

const input = document.querySelector(".about__form-input");
const search = document.querySelector(".about__form-search");
const arrowLeft = document.querySelector(".about__item-arrow--left");
const arrowRight = document.querySelector(".about__item-arrow--right");
let page = 1;
let idxImage = 0;
const images = [];

search.onclick = async () => {
	changeImg(page, idxImage, images, true);
};

arrowRight.onclick = async () => {
	if (idxImage === 2) {
		idxImage = 0;
		images.splice(0, 3);
		page += 1;
		changeImg(page, idxImage, images, true);
	} else {
		idxImage += 1;
		changeImg(page, idxImage, images);
	}
};

// arrowLeft.onclick = async () => {
// 	if (page > 1) {
// 		page -= 1;
// 		changeImg(page, idxImage, images, true);
// 		console.log(page);
// 	}
// };

arrowLeft.onclick = async () => {
	if (images.length === 0) {
		alert("Сначала выполните поиск.");
		return;
	}

	if (idxImage > 0) {
		// Переход к предыдущему изображению
		idxImage -= 1;
		changeImg(page, idxImage, images);
	} else {
		alert("Вы на первом изображении.");
	}
};

// async function goSearch(value, page) {
// 	const resp = await fetch(
// 		`https://pixabay.com/api?key=46268132-9b4ac1a47ae5c9f91ba4a44d1&q=${value}&page=${page}&per_page=3`
// 	);

// 	if (!resp.ok) {
// 		throw new Error("Network response was not ok");
// 	}

// 	const data = await resp.json();
// 	return data.hits.map((image) => image.largeImageURL);
// }

// async function changeImg(page, idxImage, images, load = false) {
// 	let url;

// 	if (load) {
// 		// 1. Получаем новые URL изображений с API
// 		const urls = await goSearch(input.value, page);

// 		// 2. Сохраняем полученные URL в массив images
// 		images.push(...urls);

// 		// 3. Получаем URL по текущему индексу
// 		url = images[idxImage];
// 	} else {
// 		// 4. Достаем URL из массива images по текущему индексу
// 		url = images[idxImage];
// 	}

// 	// Проверяем, существует ли URL
// 	if (url) {
// 		// Находим контейнер для изображений
// 		const container = document.querySelector(".image-container");
// 		if (container) {
// 			// Проверяем, существует ли уже элемент img на странице
// 			let img = container.querySelector("img");
// 			if (!img) {
// 				// Если нет, создаём его
// 				img = document.createElement("img");
// 				img.classList.add("displayed-image"); // Добавляем класс для удобства
// 				container.append(img);
// 			}
// 			// Устанавливаем src для img
// 			img.src = url;
// 		} else {
// 			console.error("Контейнер для изображений не найден");
// 		}
// 	} else {
// 		console.log("Изображение не найдено");
// 	}
// }

// const input = document.querySelector(".search");
// const button = document.querySelector("button");
// const btnLeft = document.querySelector(".left");
// const btnRight = document.querySelector(".right");
// let page = 1;
// let idxImage = 0;
// const images = [];

// // Функция для очистки текущего изображения (опционально)
// function clearImage() {
// 	const img = document.querySelector(".image-container img");
// 	if (img) {
// 		img.remove();
// 	}
// }

// button.onclick = async () => {
// 	// При нажатии на кнопку поиска, сбрасываем состояние
// 	page = 1;
// 	idxImage = 0;
// 	images.length = 0; // Очищаем массив images
// 	clearImage();

// 	const searchValue = input.value.trim();
// 	if (searchValue) {
// 		try {
// 			await changeImg(page, idxImage, images, true);
// 		} catch (error) {
// 			console.error("Ошибка при поиске изображений:", error);
// 		}
// 	} else {
// 		alert("Пожалуйста, введите запрос для поиска.");
// 	}
// };

// btnRight.onclick = async () => {
// 	if (images.length === 0) {
// 		alert("Сначала выполните поиск.");
// 		return;
// 	}

// 	if (idxImage === images.length - 1) {
// 		// Если достигли конца текущего массива, загружаем следующую страницу
// 		idxImage = 0;
// 		page += 1;
// 		try {
// 			await changeImg(page, idxImage, images, true);
// 		} catch (error) {
// 			console.error("Ошибка при загрузке новых изображений:", error);
// 		}
// 	} else {
// 		// Переход к следующему изображению
// 		idxImage += 1;
// 		changeImg(page, idxImage, images);
// 	}
// };

// btnLeft.onclick = async () => {
// 	if (images.length === 0) {
// 		alert("Сначала выполните поиск.");
// 		return;
// 	}

// 	if (idxImage > 0) {
// 		// Переход к предыдущему изображению
// 		idxImage -= 1;
// 		changeImg(page, idxImage, images);
// 	} else {
// 		alert("Вы на первом изображении.");
// 	}
// };
