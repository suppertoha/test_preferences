window.addEventListener('load', function () {
  //! Полифилл для метода forEach для NodeList
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  //! dropdown
  document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    //! Переменные
    const dropdownListItem = dropdownWrapper.querySelectorAll('.dropdown__list-item');
    const inputElement = dropdownWrapper.querySelector('.dropdown__input-hidden');
    const dropdownButton = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');

    //! Добавление класса visible dropdown. И кнопки класса active
    dropdownButton.addEventListener('click', function () {
      dropdownList.classList.toggle('visible');
      this.classList.toggle('active');
    });

    //! Выбор элемента списка. Передача выбранного значение и закрытие dropdown
    dropdownListItem.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdownButton.innerText = this.innerText;
        dropdownButton.focus();
        inputElement.value = this.dataset.value;
        dropdownList.classList.remove('visible');
        dropdownButton.classList.remove('active');
        dropdownButton.style.color = '#0B0A0A';
      });
    });

    //! Закрытие dropdown по клику на любой элемент
    document.addEventListener('click', function (e) {
      if (e.target !== dropdownButton) {
        dropdownList.classList.remove('visible');
        dropdownButton.classList.remove('active');
      }
    });

    //! Закрытие dropdown по кнопке tab или escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropdownList.classList.remove('visible');
        dropdownButton.classList.remove('active');
      }
    });
  });

  //! Темная тема
  function fonTheme() {
    const saveBtn = document.querySelector('.btn-save');
    const htmlDoc = document.querySelector('html');
    const cancel = document.querySelector('.cancel');
    const lightBtn = document.querySelector('.light');
    const darkBtn = document.querySelector('.dark');

    //! Кнопка save проверяем есть ли checked на нужной теме и запускаем функцию addDarkClassToHTML
    saveBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (darkBtn.checked) {
        localStorage.setItem('theme', 'dark');
        addDarkClassToHTML();
      } else if (lightBtn.checked) {
        localStorage.removeItem('theme');
        addDarkClassToHTML();
      }
    });

    //! Кнопка cancel делает сброс в localStorage
    cancel.addEventListener('click', (event) => {
      event.preventDefault();
      //localStorage.removeItem('theme');
      localStorage.clear()
      addDarkClassToHTML();
    });

    //! Функция которая проверят есть ли в localStorage какие данные, удаляет их и добавляет в html нужный класс
    function addDarkClassToHTML() {
      try {
        if (localStorage.getItem('theme') === 'dark') {
          htmlDoc.classList.add('dark');
        } else {
          htmlDoc.classList.remove('dark');
        }
      } catch (err) {}
    }
    addDarkClassToHTML();
  }
  fonTheme();

  //! Сохранение данных в localStorage
  function savingData() {
    const form = document.getElementById('form');
    const formFileds = form.elements;

    function changeHandler() {
      localStorage.setItem(this.name, this.value);
    }

    function checkStorage() {
      for (let i = 0; i < formFileds.length; i++) {
        formFileds[i].value = localStorage.getItem(formFileds[i].name)
      }
      attachEvents()
    }

    function attachEvents() {
      for (let i = 0; i < formFileds.length; i++) {
        formFileds[i].addEventListener('change', changeHandler);
      }
    }

    checkStorage();
  }
  savingData()

});
