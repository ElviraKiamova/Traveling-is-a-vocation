

const initialCards = [
  {
    name: 'Исаакиевская площадь в Санкт-Петербурге',
    link: './images/Saint-Petersburg.jpg'
  },
  {
    name: 'Байкал',
    link: './images/Baikal.jpg'
  },
  {
    name: 'Кавказ',
    link: './images/Caucasus.jpg'
  },
  {
    name: 'Сочи',
    link: './images/Sochi.jpg'
  },
  {
    name: 'Москва река',
    link: './images/Moscow.jpg'
  },
  {
    name: 'Волга',
    link: './images/Volga.jpg'
  }
];


const popupProfile = document.querySelector(".profile-popup");
const titleProfile = document.querySelector(".profile__title");
const subtitleProfile = document.querySelector(".profile__subtitle");
const buttonOpenFormPopupEditProfile = document.querySelector(".profile__button-pen");
const buttonProfileOpenPopupCard = document.querySelector(".profile__button-cross");

const formPopupProfile = document.querySelector(".popup__form_profile");
const popupSectionFormCard = document.querySelector(".popup_open-card");
const popupBigPicture = document.querySelector(".popup_big-picture");
const pictureBigPopup = document.querySelector(".popup__picture");
const textPictureBigPopup = document.querySelector(".popup__text-picture");

const buttonProfilePopupCloseForm = document.querySelector(".popup__button-cross");
const buttonCrossPopupBigPicture = document.querySelector(".popup__button-cross_picture");
const buttonCrossPopup = document.querySelector(".popup__button-cross_open");

const inputNamePopupForm = document.querySelector(".popup__input-form_user_name");
const inputJobPopupForm = document.querySelector(".popup__input-form_user_job");
const inputPopupCardLink = document.querySelector(".popup__input-form_link");
const inputPopupCardPosition = document.querySelector(".popup__input-form_position");

const contentCardElement = document.querySelector("#elements").content;
const sectionContainerCard = document.querySelector(".elements")
const ESC_CODE = "Escape";



const listPopups = document.querySelectorAll(".popup");
listPopups.forEach(function(popup) {
  popup.addEventListener("click", function(event) {
    if(event.target === event.currentTarget) {
       closePopup(popup);
    }
  });
});



function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',  closeByEsc)

}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',  closeByEsc)
}


function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
} 



buttonOpenFormPopupEditProfile.addEventListener("click", () => {
  inputNamePopupForm.value = titleProfile.textContent;
  inputJobPopupForm.value = subtitleProfile.textContent;
  openPopup(popupProfile);
});

buttonProfilePopupCloseForm.addEventListener("click", () => closePopup(popupProfile));

buttonProfileOpenPopupCard.addEventListener("click", () => openPopup(popupSectionFormCard));
buttonCrossPopup.addEventListener("click", () => closePopup(popupSectionFormCard));


buttonCrossPopupBigPicture.addEventListener("click", () => closePopup(popupBigPicture));


  function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    titleProfile.textContent = inputNamePopupForm.value;
    subtitleProfile.textContent = inputJobPopupForm.value;
    
    const buttonSaveProfile = document.querySelector(".popup__button-save_profile");
    buttonSaveProfile.classList.add("popup__button-save_disabled");
    buttonSaveProfile.setAttribute("disabled", true);

    closePopup(popupProfile);
}

formPopupProfile.addEventListener("submit", (event) => handleProfileFormSubmit(event));



function render() {
  sectionContainerCard.innerHTML = "";
  initialCards.forEach(addCardElement);
}

function addCardElement (card) {
  const cloneContentCardElement = renderItem(card);
  sectionContainerCard.appendChild(cloneContentCardElement);

}

function renderItem(card) {
  const cardElementNew = contentCardElement.cloneNode(true);
  const elementImage = cardElementNew.querySelector(".element__image");
  cardElementNew.querySelector(".element__title").innerText = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  setDeleteHandler(cardElementNew);
  handLike(cardElementNew);

  elementImage.addEventListener('click', () => {
    pictureBigPopup.src = card.link;
    textPictureBigPopup.textContent = card.name;
    pictureBigPopup.alt = card.name;
    openPopup(popupBigPicture);
  });

  return cardElementNew;
}


function setDeleteHandler(element) {
  element.querySelector(".element__delete-button").addEventListener("click", handDelete)
}

function handDelete(event) {
  event.target.closest(".element").remove();
}

function handLike(element) {
  element.querySelector(".element__heart-button").addEventListener("click", toggleLike)
}

function toggleLike(event) {
  event.target.classList.toggle("element__heart-button_dark");
}

render();





function addNewCard(event) {
  event.preventDefault();
  sectionContainerCard.prepend(renderItem({
    name: inputPopupCardPosition.value,
    link: inputPopupCardLink.value
  }));

  inputPopupCardPosition.value = "";
  inputPopupCardLink.value = "";
 
  const buttonSaveCard = document.querySelector(".popup__button-save_create");
  buttonSaveCard.classList.add("popup__button-save_disabled");
  buttonSaveCard.setAttribute("disabled", true);

  closePopup(popupSectionFormCard);
}

popupSectionFormCard.addEventListener('submit', (event) => addNewCard(event));



