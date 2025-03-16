const products = [
  {
    id: 0,
    name: "Ögonbrynspenna",
    price: 20,
    rating: 2,
    amount: 0,
    category: "Ögon",
    img: {
      url: "asset/images/Eye-brows.jpg",
      width: 100,
      height: 100,
      alt: "Ögonbrynspenna i brun nyans, smink för att definiera ögonbrynen.",
    },
  },
  {
    id: 1,
    name: "Mascara",
    price: 50,
    rating: 4,
    amount: 0,
    category: "Ögon",
    img: {
      url: "asset/images/Mascara.jpg",
      width: 100,
      height: 100,
      alt: "Svart mascara som ger volym åt fransarna.",
    },
  },
  {
    id: 2,
    name: "Ögonskugga",
    price: 30,
    rating: 3,
    amount: 0,
    category: "Ögon",
    img: {
      url: "asset/images/Eyeshadow-Palette.jpg",
      width: 100,
      height: 100,
      alt: "Ögonskuggspalett med olika nyanser av glitter.",
    },
  },
  {
    id: 3,
    name: "Foundation",
    price: 60,
    rating: 5,
    amount: 0,
    category: "Ansikte",
    img: {
      url: "asset/images/Foundation.jpg",
      width: 100,
      height: 100,
      alt: "Foundation i olika nyanser, ger jämn täckning för ansiktet.",
    },
  },
  {
    id: 4,
    name: "Concealer",
    price: 40,
    rating: 5,
    amount: 0,
    category: "Ansikte",
    img: {
      url: "asset/images/Concealer.jpg",
      width: 100,
      height: 100,
      alt: "Concealer för att ljusa upp och täcka ojämnheter i ansiktet.",
    },
  },
  {
    id: 5,
    name: "Puder",
    price: 70,
    rating: 2,
    amount: 0,
    category: "Ansikte",
    img: {
      url: "asset/images/Powder.jpg",
      width: 100,
      height: 100,
      alt: "Puder för en matt finish och långvarigt smink.",
    },
  },
  {
    id: 6,
    name: "Läppstift",
    price: 20,
    rating: 3,
    amount: 0,
    category: "Läppar",
    img: {
      url: "asset/images/Lipstick.jpg",
      width: 100,
      height: 100,
      alt: "Läppstift som ger en fin färg för en klassisk läpplook.",
    },
  },
  {
    id: 7,
    name: "Läppglans",
    price: 30,
    rating: 4,
    amount: 0,
    category: "Läppar",
    img: {
      url: "asset/images/Lip-Gloss.jpg",
      width: 100,
      height: 100,
      alt: "Glansigt läppglans som ger en plumpande och glänsande effekt på läpparna.",
    },
  },
  {
    id: 8,
    name: "Läppenna",
    price: 60,
    rating: 5,
    amount: 0,
    category: "Läppar",
    img: {
      url: "asset/images/Lip-Liner.jpg",
      width: 100,
      height: 100,
      alt: "Läppenna i en naturlig nyans för att definiera och forma läpparna.",
    },
  },
  {
    id: 9,
    name: "Bors-set",
    price: 100,
    rating: 2,
    amount: 0,
    category: "Kits",
    img: {
      url: "asset/images/Brush-Set.jpg",
      width: 100,
      height: 100,
      alt: "Makeupborstset med alla nödvändiga borstar för ansikts- och ögonmakeup.",
    },
  },
  {
    id: 10,
    name: "Smink-kit",
    price: 200,
    rating: 3,
    amount: 0,
    category: "Kits",
    img: {
      url: "asset/images/Dream-kit.jpg",
      width: 100,
      height: 100,
      alt: "Komplett smink-kit med ett urval av produkter för en fullständig skönhetslook.",
    },
  },
  {
    id: 11,
    name: "Jul-kit",
    price: 150,
    rating: 5,
    amount: 0,
    category: "Kits",
    img: {
      url: "asset/images/Christmas-kit.jpg",
      width: 100,
      height: 100,
      alt: "Julkitet med festliga sminkprodukter för en glittrig och rolig högtid.",
    },
  },
];
//-------------------------------VARIABELDEKLARATIONER----------------------------------------------

// hämta html-element
const productsListDiv = document.querySelector("#productsList");
const cartHtmlContainer = document.querySelector("#cartContent");

//-----------------------------specialregler----------------------------------------------

// Timeout för att varna användaren om långsam beställning
let slownessTimeout = setTimeout(stupidCustomerMessage, 1000 * 60 * 15);

function stupidCustomerMessage() {
  alert("Du är för långsam på att beställa");
  location.reload(); 
}

//funktion för att hämta pruduks rating
function getRatingHtml(rating) {
  let html = ``;
  for (let i = 0; i < rating; i++) {
    html += `<span>⭐</span>`;
  }

  return html;
}
//funktion för att beräkna prisökning beroende på tid och dag
function getPriceMultiplier() {
  const today = new Date();
  const isFriday = today.getDay() === 6; 
  const isMonday = today.getDay() === 1;
  const currentHour = today.getHours();

    if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
    return 1.15; 
  }
  return 1; 
}

//----------------------------- PRODUKTLISTA OCH PRISBERÄKNING----------------------------------------------


// Funktion för att skriva ut produkterna
function printProductList() {
    const productsListDiv = document.querySelector("#productsList");
    productsListDiv.innerHTML = ""; // Rensar listan
  
    let priceIncrease = getPriceMultiplier(); // Hämta prisökning
    let totalSum = 0; // Total summa för alla produkter
  
    // Loopa genom produkterna och skriv ut dem
    products.forEach((product) => {
      const adjustedPrice = product.price * priceIncrease; // Pris efter eventuell ökning
      totalSum += product.amount * adjustedPrice; // Lägg till produktens pris till totalen
  
      productsListDiv.innerHTML += `
          <article class="product">
              <h3>${product.name}</h3>
              <p>${adjustedPrice} kr</p>
              <p>Rating:${getRatingHtml(product.rating)}</p>
              <img src="${product.img.url}" alt="${product.img.alt}">
              <div class="product-quantity">
              <button class="decrease" id="decrease-${product.id}">-</button>
              <p class="amount">${product.amount}</p>
              <button class="increase" id="increase-${product.id}">+</button>
              </div>
          </article>
          `;
    });
  
    // Dölja faktura-alternativet om den totala summan är större än 800 kr
    if (totalSum > 800) {
      document.querySelector('#invocePaymentRadio').classList.add('hidden'); // Dölj faktura-alternativet
    } else {
      document.querySelector('#invocePaymentRadio').classList.remove('hidden'); // Visa faktura-alternativet
    }
  
    //---------------------eventlyssnare för + och - knapparna--------------------------------------
    const increaseButtons = document.querySelectorAll("button.increase");
    increaseButtons.forEach((button) => {
      button.addEventListener("click", increaseProductCount);
    });
  
    // Lägg till eventlyssnare för "decrease"-knapparna
    const decreaseButtons = document.querySelectorAll("button.decrease");
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", decreaseProductCount);
    });
  
    updateCartCount();
  }
  

//------------------------öka och mindska antal produkter----------------------------------------------

function increaseProductCount(e) {
  const productId = Number(e.target.id.replace("increase-", ""));

  const clickedButtonId = e.target.id;

  const foundProductIndex = products.findIndex((product) => product.id === productId);


  if (foundProductIndex === -1) {
    console.error("product not found");
    return;
  }

  products[foundProductIndex].amount += 1;

  printProductList();
  document.querySelector(`#${clickedButtonId}`).focus();
  printCartMakeup();
  updateCartCount();
}

function decreaseProductCount(e) {
  const productId = Number(e.target.id.replace("decrease-", ""));


  const clickedButtonId = e.target.id;

  const foundProductIndex = products.findIndex((product) => product.id === productId);

  if (foundProductIndex === -1) {
    console.error("product not found");
    return;
  }
 
  if (products[foundProductIndex].amount > 0) {
    products[foundProductIndex].amount -= 1;
  }

  printProductList();
  document.querySelector(`#${clickedButtonId}`).focus();
  printCartMakeup();
  updateCartCount();
}

//------------------------Aktivera varukorgen för tab ----------------------------------------------
const menuToggle = document.getElementById('menuToggle');
const menuButtonLabel = document.querySelector('.buttonWrapper');

menuButtonLabel.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {  
    menuToggle.checked = !menuToggle.checked;  
    menuToggle.dispatchEvent(new Event('change'));
  }
});

//------------------------Hantera kundvagn----------------------------------------------

function printCartMakeup() {
  cartHtmlContainer.innerHTML = ""; 

  let sum = 0;
  let orderdMakeupAmount = 0;
  let msg = "";
  let priceIncrease = getPriceMultiplier();


  products.forEach((product) => {
    orderdMakeupAmount += product.amount;

    if (product.amount > 0) {
      let makeupPrice = product.price;
      if (product.amount >= 10) {
        makeupPrice *= 0.9; 
      }

      const adjustedProductPrice = makeupPrice * priceIncrease;
      sum += product.amount * adjustedProductPrice;

      cartHtmlContainer.innerHTML += `
            <article>
            <span>${product.name}</span> | 
            <span>${product.amount} st</span> | 
            <span>${product.amount * adjustedProductPrice} kr</span>
            </article>
            `;
    }
  });

  if (sum <= 0) {
    return; 
  }

  // måndagsrabatt
  if (today.getDay() === 1) {
    sum *= 0.9;
    msg += "<p>Måndagsrabatt: 10% på hela beställningen</p>";
  }
  //visa totalpris och frakt
  cartHtmlContainer.innerHTML += `<p>Total: ${sum} kr</p>`;
  cartHtmlContainer.innerHTML += `<div>${msg}</div>`;

  if (orderdMakeupAmount >= 15) {
    cartHtmlContainer.innerHTML += `<p> 0 kr</p>`; //gratis frakt om mängden är 15 eller mer
  } else {
    cartHtmlContainer.innerHTML += `<p>Shipping: ${Math.round(
      25 + 0.1 * sum
    )} kr</p>`;
  }
  updateCartCount();
}

//----------------------------- BETALNING----------------------------------------------

const cardInvoiceRadios = Array.from(
    document.querySelectorAll('input[name="payment-option"]')
  );
  const inputs = [
    document.querySelector("#creditCardNumber"),
    document.querySelector("#creditCardYear"),
    document.querySelector("#creditCardMonth"),
    document.querySelector("#personalID"),
    document.querySelector("#firstName"),
    document.querySelector("#lastName"),
    document.querySelector("#address"),
    document.querySelector("#postalCode"),
    document.querySelector("#city"),
    document.querySelector("#phone"),
    document.querySelector("#email")
  ];
  
  const invoiceOption = document.querySelector("#invoice");
  const cardOption = document.querySelector("#card");
  const orderBtn = document.querySelector("#orderBtn");
  const privacyCheckbox = document.getElementById('privacyPolicy');
  
  let selectedPaymentOption = "card";
  
  const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
  const creditCardNumberRegEx = new RegExp(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/); // MasterCard
  
  
  // Eventlyssnare för att aktivera beställningsknappen
  inputs.forEach(input => {
    input.addEventListener('focusout', activateOrderButton);
    input.addEventListener('change', activateOrderButton);
  });
  
  cardInvoiceRadios.forEach((radioBtn) => {
    radioBtn.addEventListener("change", switchPaymentMethod);
  });
  
  // Funktion för att byta betalningsmetod
  function switchPaymentMethod(e) {
    invoiceOption.classList.toggle("hidden");
    cardOption.classList.toggle("hidden");
  
    selectedPaymentOption = e.target.value;
    clearErrors(); 
    console.log(selectedPaymentOption);
  }

  function clearErrors() {
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = ''; // Töm felmeddelandena
  
    const formErrorsDiv = document.getElementById('formErrors');
    formErrorsDiv.classList.add('hidden'); // Dölj felmeddelandelistan
  }  
  
  function isPersonalIdNumberValid() {
    return personalIdRegEx.exec(personalID.value);
  }
  
  function isCardValid() {
    let isValid = true;
  
    if (creditCardNumber.value && !creditCardNumberRegEx.exec(creditCardNumber.value)) {
      console.warn('Credit card number is not valid');
      isValid = false;
    }
  
    const today = new Date();
    const year = Number(creditCardYear.value);
    const shortYear = Number(String(today.getFullYear()).substring(2));
  
    if (year < shortYear || year > shortYear + 10) {
      console.warn('Credit card year is not valid');
      isValid = false;
    }
  
    if (creditCardMonth.value < 1 || creditCardMonth.value > 12) {
      console.warn('Credit card month is not valid');
      isValid = false;
    }
  
    if (creditCardCvc.value.length !== 3) {
      console.warn('Credit card CVC is not valid');
      isValid = false;
    }
    if (year === today.getFullYear() && creditCardMonth.value < today.getMonth() + 1) {
        console.warn('Credit card has expired');
        isValid = false;
      }
      
  
    return isValid;
  }
  
  function isFormValid() {
    // Validera alla fält
    const isPrivacyAccepted = privacyCheckbox.checked;
    const isNameValid = firstName.value.trim() !== '' && lastName.value.trim() !== '';
    const isAddressValid = address.value.trim() !== '' && postalCode.value.trim() !== '' && city.value.trim() !== '';
    const isPhoneValid = phone.value.trim() !== '';
    const isEmailValid = email.value.trim() !== '';
  
    let isPaymentValid = false;
  
    // Validering för betalmetod
    if (selectedPaymentOption === "invoice") {
      isPaymentValid = isPersonalIdNumberValid(); // Faktura kräver personnummer
    } else if (selectedPaymentOption === "card") {
      // Validera kort endast om betalsättet är "kort"
      isPaymentValid = isCardValid(); 
    }
  
    return isPrivacyAccepted && isNameValid && isAddressValid && isPhoneValid && isEmailValid && isPaymentValid;
  }
  
  function activateOrderButton() {
    // Om formuläret är korrekt ifyllt, aktivera beställningsknappen
    if (isFormValid()) {
      orderBtn.removeAttribute('disabled');
    } else {
      orderBtn.setAttribute('disabled', '');
    }
  }
  
  // Funktion för att visa bekräftelsemeddelande
  function showOrderConfirmation() {
    const orderConfirmationDiv = document.getElementById("orderConfirmationMessage");
    let sum = products.reduce((total, product) => total + product.amount * product.price, 0);
  
    // Beräkna leveransdatum (3-5 dagar framåt)
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + Math.floor(Math.random() * 3) + 3); 
  
    orderConfirmationDiv.innerHTML = `
      <h3>Tack för din beställning!</h3>
      <p>Du har handlat för totalt: <strong>${sum.toFixed(2)} kr</strong>.</p>
      <p>Din leverans förväntas komma den: <strong>${deliveryDate.toLocaleDateString("sv-SE")}</strong>.</p>
    `;
    orderConfirmationDiv.classList.remove("hidden"); 
  }

  
  // Funktion som körs när checkboxen ändras
  privacyCheckbox.addEventListener('change', function() {
    orderBtn.disabled = !privacyCheckbox.checked;
  });
  
  // Initialt inaktivera beställ-knappen om checkboxen inte är markerad
  orderBtn.disabled = !privacyCheckbox.checked;
  
  // Funktion som körs när checkboxen ändras
  privacyCheckbox.addEventListener('change', function() {
    activateOrderButton(); 
  });

//-------------------------------Rensa formulär och varukorg----------------------------------------------

function clearForm() {
    document.getElementById("orderForm").reset(); 
  
    products.forEach((product) => {
      product.amount = 0;
    });
  
    printProductList();  
    printCartMakeup();   
    updateCartCount();   
  }
  
  //-------------------------------Eventlyssnare----------------------------------------------
  document.getElementById("clearOrder").addEventListener("click", clearForm);

  orderBtn.addEventListener("click", function (e) {
    e.preventDefault(); 
    showOrderConfirmation(); 
    clearForm(); 
  });

  inputs.forEach(input => {
    input.addEventListener('focusout', activateOrderButton);
    input.addEventListener('change', activateOrderButton);
  });
  
  cardInvoiceRadios.forEach(radioBtn => {
    radioBtn.addEventListener('change', activateOrderButton);
  });
  
    privacyCheckbox.addEventListener('change', function() {
        activateOrderButton(); 
    });

//-------------------------------uppdatera kundvagn----------------------------------------------

// Funktion för att beräkna totalt antal produkter i varukorgen
function updateCartCount() {
  const totalAmount = products.reduce(
    (acc, product) => acc + product.amount,
    0
  );
  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = totalAmount;
}


//-------------------------------VALIDERING----------------------------------------------

// Funktion för att validera personnummer

function isValidPersonnummer() {
    const inputField = document.getElementById("personalID");
    const personnummer = inputField.value.trim(); 
  
    // Rensa tidigare felmeddelanden
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = '';
  
    if (!personnummer) {
      showError("Personnummer får inte vara tomt.");
      return false;
    }
  
    const personalIdRegEx = /^(\d{6}[- ]?\d{4}|\d{8}[- ]?\d{4}|\d{10}|\d{12})$/;
    if (!personalIdRegEx.test(personnummer)) {
      showError("Personnummer måste vara 10 eller 12 siffror och kan innehålla '-' eller ' '.");
      return false;
    }
  
    return true; 
}

const personalIDField = document.getElementById("personalID");
const personnummer = personalIDField.value.trim(); 

personalIDField.addEventListener("input", () => {
  if (isValidPersonnummer()) {
    console.log("Personnumret är giltigt!");
    personalIDField.classList.remove("error");
    personalIDField.classList.add("valid");
  } else {
    console.log("Personnumret är ogiltigt!");
    personalIDField.classList.remove("valid");
    personalIDField.classList.add("error");
  }
});


  function luhnCheck(number) {
    let sum = 0;
    let shouldDouble = false;
  
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9; 
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble; 
    }
  
    return sum % 10 === 0;
  }

  //--------------------------formulär variabler ----------------------------------------------

  const fieldsToValidate = [
    { fieldId: 'firstName', errorSpanId: 'nameSpan', fieldName: 'Förnamn' },
    { fieldId: 'lastName', errorSpanId: 'lastNameSpan', fieldName: 'Efternamn' },
    { fieldId: 'address', errorSpanId: 'addressSpan', fieldName: 'Adress' },
    { fieldId: 'postalCode', errorSpanId: 'postalCodeSpan', fieldName: 'Postnummer' },
    { fieldId: 'city', errorSpanId: 'citySpan', fieldName: 'Postort' },
    { fieldId: 'phone', errorSpanId: 'phoneSpan', fieldName: 'Telefonnummer' },
    { fieldId: 'email', errorSpanId: 'emailSpan', fieldName: 'E-postadress' }
];


function validateFields() {
    fieldsToValidate.forEach(field => {
        const inputField = document.getElementById(field.fieldId);
        const errorSpan = document.getElementById(field.errorSpanId);
        
        errorSpan.innerHTML = ''; // Rensa tidigare felmeddelanden

        if (inputField.value.trim() === '') {
            errorSpan.innerHTML = `${field.fieldName} är obligatoriskt.`;
        }
    });
}

  
// Lägg till eventlyssnare för varje fält
// fieldsToValidate.forEach(field => {
//     const inputField = document.getElementById(field.fieldId);
//     inputField.addEventListener("blur", validateFields); 
// });

//--------------------------------------------------


  function validateForm() {
    const errors = [];

    // Validera fälten
    if (firstName.value.trim() === '') {
        errors.push('Förnamn är obligatoriskt.');
    }
    if (lastName.value.trim() === '') {
        errors.push('Efternamn är obligatoriskt.');
    }
    if (address.value.trim() === '') {
        errors.push('Adress (gata) är obligatorisk.');
    }
    if (postalCode.value.trim() === '') {
        errors.push('Postnummer är obligatoriskt.');
    }
    if (city.value.trim() === '') {
        errors.push('Postort är obligatorisk.');
    }
    if (phone.value.trim() === '') {
        errors.push('Telefonnummer är obligatoriskt.');
    }
    if (email.value.trim() === '') {
        errors.push('E-postadress är obligatorisk.');
    }

    // Kontrollera betalalternativ
    if (!selectedPaymentOption) {
        errors.push('Välj ett betalsätt (kort eller faktura).');
    }

    // Kontrollera personnummer om faktura är valt
    if (selectedPaymentOption === 'invoice') {
        console.log('Betalsätt: Faktura');

        const personalIDField = document.getElementById("personalID");
        const personnummer = personalIDField.value.trim();

        // Validera att fältet inte är tomt
        if (!personnummer) {
            errors.push('Personnummer är obligatoriskt för faktura.');
        } else {
            // Kontrollera att personnummer matchar det tillåtna formatet
            const personalIdRegEx = /^(\d{6}[- ]?\d{4}|\d{8}[- ]?\d{4}|\d{10}|\d{12})$/;
            if (!personalIdRegEx.test(personnummer)) {
                errors.push('Personnummer måste vara 10 eller 12 siffror och kan innehålla "-" eller " ".');
            }
        }
    }

    // Kortinformation (vid kortbetalning)
    if (selectedPaymentOption === 'card') {
        if (!creditCardNumberRegEx.exec(creditCardNumber.value)) {
            errors.push('Kortnummer är inte giltigt.');
        }
        if (creditCardMonth.value < 1 || creditCardMonth.value > 12) {
            errors.push('Kortmånad är inte giltig.');
        }
        const today = new Date();
        const year = Number(creditCardYear.value);
        const shortYear = Number(String(today.getFullYear()).substring(2));
        if (year < shortYear || year > shortYear + 10) {
            errors.push('Kortår är inte giltigt.');
        }
        if (creditCardCvc.value.length !== 3) {
            errors.push('CVC är inte giltigt.');
        }
    }

    // Godkännande av personuppgifter
    if (!privacyCheckbox.checked) {
        errors.push('Du måste godkänna behandling av personuppgifter.');
    }

    // Visa felmeddelanden
    showErrors(errors);

    // Om det finns felmeddelanden, hindra formuläret från att skickas
    return errors.length === 0;
}


function showErrors(errors) {
    const errorMessagesContainer = document.getElementById('errorMessages');
    errorMessagesContainer.innerHTML = '';  // Töm tidigare felmeddelanden

    if (errors.length > 0) {
        const formErrorsContainer = document.getElementById('formErrors');
        formErrorsContainer.classList.remove('hidden');

        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorMessagesContainer.appendChild(li);
        });
    } else {
        // Om inga fel finns, göm felmeddelanden
        document.getElementById('formErrors').classList.add('hidden');
    }
}



  //-----------------------------Felmeddelanden----------------------------------------------

  function showError(message) {
    const errorMessagesDiv = document.getElementById('errorMessages');
    const errorMessageItem = document.createElement('li');
    errorMessageItem.textContent = message;
    errorMessagesDiv.appendChild(errorMessageItem);
    
    // Visa div om den är dold
    const formErrorsDiv = document.getElementById('formErrors');
    formErrorsDiv.classList.remove('hidden');
  }
  
  function isCardValid() {
    let isValid = true;
  
    // Rensa tidigare felmeddelanden
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = '';
  
    if (creditCardNumber.value && !creditCardNumberRegEx.exec(creditCardNumber.value)) {
      isValid = false;
      showError('Kortnummer är inte giltigt.');
    }
  
    const today = new Date();
    const year = Number(creditCardYear.value);
    const shortYear = Number(String(today.getFullYear()).substring(2));
  
    if (year < shortYear || year > shortYear + 10) {
      isValid = false;
      showError('Kortår är inte giltigt.');
    }
  
    if (creditCardMonth.value < 1 || creditCardMonth.value > 12) {
      isValid = false;
      showError('Kortmånad är inte giltig.');
    }
  
    if (creditCardCvc.value.length !== 3) {
      isValid = false;
      showError('CVC är inte giltigt.');
    }
  
    return isValid;
  }
  

//-------------------------------Produktlista och Formulär----------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    // Skriv ut produktlistan och uppdatera kundvagnen
    printProductList(); 
    updateCartCount(); 

    // Lägg till en eventlyssnare för att hantera formulärets inlämning
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            // Validera formuläret
            if (validateForm()) {
                console.log("Formuläret är giltigt!");
                showOrderConfirmation(); 
                clearForm(); 
            } else {
                console.log("Formuläret är ogiltigt!");
            }
        });
    }

    // Lägg till eventlyssnare för formulärfälten
    fieldsToValidate.forEach(field => {
        const inputField = document.getElementById(field.fieldId);
        if (inputField) {
            inputField.addEventListener("blur", validateFields); 
        }
    });

    // Lägg till eventlyssnare för sorteringsknappar
    document.getElementById("sortByName").addEventListener("click", sortByName);
    document.getElementById("sortByPrice").addEventListener("click", sortByPrice);
    document.getElementById("sortByCategory").addEventListener("click", sortByCategory);
    document.getElementById("sortByRating").addEventListener("click", sortByRating);
});

// Sorteringsfunktioner
function sortByName() {
    products.sort((a, b) => a.name.localeCompare(b.name)); 
    printProductList(); 
}

function sortByPrice() {
    products.sort((a, b) => a.price - b.price); 
    printProductList(); 
}

function sortByCategory() {
    products.sort((a, b) => a.category.localeCompare(b.category)); 
    printProductList(); 
}

function sortByRating() {
    products.sort((a, b) => b.rating - a.rating); 
    printProductList(); 
}


printProductList();