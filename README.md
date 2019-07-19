[![Build Status](https://travis-ci.org/linarsy/frontend-project-lvl2.svg?branch=master)](https://travis-ci.org/linarsy/frontend-project-lvl2)
[![Maintainability](https://api.codeclimate.com/v1/badges/36562bc23413e8a36eef/maintainability)](https://codeclimate.com/github/linarsy/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/36562bc23413e8a36eef/test_coverage)](https://codeclimate.com/github/linarsy/frontend-project-lvl2/test_coverage)

# frontend-project-lvl2

Проект выполнен в рамках прохождения профессии "Фронтенд JavaScript" на сайте [Хекслет](https://ru.hexlet.io/).
Цель проекта реализовать утилиту для поиска отличий в конфигурационных файлах. Возможности утилиты: поддержка разных форматов, генерация отчета в виде plain text, pretty и json.

**Установка**
```$ npm link linay-gendiff```

**Вызов справки**
```$ gendiff --help```

[![asciicast](https://asciinema.org/a/258163.svg)](https://asciinema.org/a/258163)

### **Сравнение файлов в формате json**

**вызов программы**
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/258149.svg)](https://asciinema.org/a/258149)


### **Сравнение файлов в формате yml**

**вызов программы**
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/258150.svg)](https://asciinema.org/a/258150)

### **Сравнение файлов в формате ini**

**вызов программы**
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/258151.svg)](https://asciinema.org/a/258151)

### **Вывод в формате pretty (формат по-умолчанию)**

**вызов программы**
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/258156.svg)](https://asciinema.org/a/258156)

### **Вывод в формате plain text**

**вызов программы**
```$ gendiff --format plain <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/258158.svg)](https://asciinema.org/a/258158)

### **Вывод в формате json**

**вызов программы**
```$ gendiff --format json <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/258159.svg)](https://asciinema.org/a/258159)
