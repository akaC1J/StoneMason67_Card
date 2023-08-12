import './styles.css';
const imageUpload = document.getElementById('image-upload') as HTMLInputElement;
const previewContainer = document.getElementById('preview') as HTMLElement;

imageUpload.addEventListener('change', function() {
    // Очистим текущий превью перед добавлением новых изображений
    previewContainer.innerHTML = '';

    // Проверка на наличие файлов
    if (this.files) {
        // Переберем все выбранные файлы
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = function(e: ProgressEvent<FileReader>) {
                    const image = new Image();
                    image.src = e.target?.result as string;
                    image.width = 100;  // Устанавливаем ширину превью
                    image.height = 100; // Устанавливаем высоту превью
                    previewContainer.appendChild(image);
                };

                reader.readAsDataURL(file);
            }
        }
    }
});
