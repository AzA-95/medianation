// Пакет нужен чтобы очишать контент в файле .nuxt/types/vue-shim.d.ts
// Так как там находится контент (declare module .vue)
// Который не показывает ошибку typescript при импорте .vue файлов которых не существует
// Например import BaseInput from '@/components/base-input/index.vue'
// не даст ошибку typescript так как файл сушествует а
// import BaseInput from '@/components/base-input/error.vue даст ошибку typescript так как файла нет
// Но без очишения контента файла .nuxt/types/vue-shim.d.ts
// import BaseInput from '@/components/base-input/error.vue typescript не выдаст ошибку хотя такого файла нет.
// По сути этот пакет запускается при коммите и ошибка неверного импорта отлавливается тайпскриптом через пакет
// vue-tsc в lint-staged.config.mjs

import { access, constants, writeFile } from 'node:fs';

const file = '.nuxt/types/vue-shim.d.ts';

access(file, constants.F_OK | constants.W_OK, (err) => {
	if (err) throw err;

	// console.log(`File exists and writable`);

	writeFile(file, '', (err) => {
		if (err) throw err;

		// console.log('The file has been saved!');
	});
});
