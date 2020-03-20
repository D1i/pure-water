(function() {
    "use strict";

    function checkedCheckboxOfLabel(event) {
        let elem = event.target;

        if (elem.getAttribute("class") === "label-accept-agreement") {
            elem.setAttribute("class", "label-accept-agreement_checked");
            return;
        }
        elem.setAttribute("class", "label-accept-agreement");
    }

    function transitionToOrder() {
        document.querySelector(".order-window").style.display = "flex";
        document.querySelector(".information-about-company").style.display = "none";
    }

    function fieldValidation(){
        let elem = document.querySelector(".next-order-dtely");
        let activeElem = document.querySelector(".next-order-dtely_active");
        if (processValidationPass.validationNamePassed &&
            processValidationPass.validationPhoneNumberPassed &&
            processValidationPass.validationEmailPassed &&
            processValidationPass.validationAddressPassed &&
            processValidationPass.validationAcceptingAgreement &&
            Boolean(elem)) {
            elem.setAttribute("class", "next-order-dtely_active trigger-of-event-next-order-dtely")
            return;
        } else {
            if (activeElem === null) {
                return;
            }
            activeElem.setAttribute("class", "next-order-dtely trigger-of-event-next-order-dtely")
        }
    }

    function fieldValidationName() {
        userData.name = document.querySelector(".user-name").value;
        let name = userData.name;
        let positionSpace = 0;
        for (let i = 0; i < 2; i++) {
            if (name.indexOf(" ", positionSpace) === -1) {
                    processValidationPass.validationNamePassed = false;
                    return;
                }
                positionSpace = name.indexOf(" ") + 1;
            }
            positionSpace = 0;
            for (let i = 0; i < 3; i++) {
                if (name[name.indexOf(" ", positionSpace) + 1] === undefined ||
                    name[name.indexOf(" ", positionSpace) + 1] === " ") {
                    processValidationPass.validationNamePassed = false;
                    fieldValidation();
                    return;
                }
                positionSpace = name.indexOf(" ") + 1;
            }
        processValidationPass.validationNamePassed = true;
        fieldValidation();

    }

    function fieldValidationPhoneNumber() {
        userData.phoneNumber = document.querySelector(".user-phone-number").value;
        if (!(Number(userData.phoneNumber) > 999)) {
            processValidationPass.validationPhoneNumberPassed = false;
            return;
        }
        processValidationPass.validationPhoneNumberPassed = true;
        fieldValidation();
    }

    function fieldValidationEmail() {
        let email = userData.email;
        email = document.querySelector(".user-email").value;
        if (!email.includes("@") || !email.includes(".")) {
            processValidationPass.validationEmailPassed = false;
            fieldValidation();
            return;
        }
        processValidationPass.validationEmailPassed = true;
        fieldValidation();
    }

    function fieldValidationAddress() {
        userData.date = document.querySelector(".user-address").value;
        if (userData.date.length < 1) {
            processValidationPass.validationAddressPassed = false;
            fieldValidation();
            return;
        }
        processValidationPass.validationAddressPassed = true;
        fieldValidation();
    }

    function checkboxValidationAcceptingAgreement() {
        if (document.querySelector(".accept-agreement").checked) {
            processValidationPass.validationAcceptingAgreement = true;
            fieldValidation();
            return;
        }

        processValidationPass.validationAcceptingAgreement = false;
        fieldValidation();
    }

    function renderSelectionWaterVolume(codeOfGeneration) {
        const container = document.querySelector(".selection-water-volume");

        let data = "";

        for (let objectOfGeneration of codeOfGeneration) {
            data = `
                    ${data}
                    <div class="container-for-selection-water-volume">
                        <div class="information-about-selected-water-volume">
                            <p class="volume-selection-water-volume">${objectOfGeneration.volume} л</p>
                            <h6 class="quantity-selection-water-volume">${objectOfGeneration.quantity} шт</h6>
                            <p class="price-selection-water-volume">${objectOfGeneration.price} ₽</p>
                        </div>
                        <div class="quantity-control">
                            <button class="remove-selection-party"><b>-</b></button>
                            <div class="quantity-selection-party">0</div>
                            <button class="add-selection-party"><b>+</b></button>
                        </div>
                    </div>
        `
        }

        container.innerHTML = '<h3 class="block-selection-water-volume">Вода</h3>' + data;


    }

    function transitionToOrderDetals() {
        const elem = document.querySelector(".trigger-of-event-next-order-dtely");
        if (elem === null) {
            return;
        }
        if (!elem.getAttribute("class").includes("next-order-dtely_active")) {
            return;
        }

        document.querySelector(".order-details").style.display = "flex";
        document.querySelector(".total-price").style.display = "flex";
        document.querySelector(".finish-order").style.display = "block";
        document.querySelector(".input-container").style.display = "none";
        document.querySelector(".order-window-header").style.display = "none";
        document.querySelector(".button-return-to-previous-stage").style.display = "block";
    }

    function buttonReturnToPreviousStage() {
        document.querySelector(".button-return-to-previous-stage").style.display = "none";
        document.querySelector(".order-details").style.display = "none";
        document.querySelector(".total-price").style.display = "none";
        document.querySelector(".finish-order").style.display = "none";
        document.querySelector(".input-container").style.display = "flex";
        document.querySelector(".order-window-header").style.display = "block";
    }

    function controlSelectionParty(event) {
        const getClassElemParentNode = event.target.parentNode.getAttribute("class");
        let elemParentNodeContent = Number(event.target.parentNode.parentNode.querySelector(".quantity-selection-party").innerHTML);
        //complete

        if (getClassElemParentNode !== "add-selection-party" &&
            getClassElemParentNode !== "remove-selection-party") {
            return;
        }

        if (event.target.getAttribute("class") === "add-selection-party" ||
            getClassElemParentNode === "add-selection-party") {
            elemParentNodeContent++
            elemParentNodeContent = isNaN(elemParentNodeContent)?
                1:
                elemParentNodeContent;
        }

        if (event.target.getAttribute("class") === "remove-selection-party" ||
            getClassElemParentNode === "remove-selection-party") {
            elemParentNodeContent -= 1;
            elemParentNodeContent = isNaN(elemParentNodeContent) || elemParentNodeContent === -1?
                0:
                elemParentNodeContent;
        }

        event.target.parentNode.parentNode.querySelector(".quantity-selection-party").innerHTML = elemParentNodeContent;
        priceСalculation(event.target);
    }

    function chooseProduct(event) {
        if (event.target.parentNode.querySelector(".quantity-control") === null) {
            return;
        }
        if (event.target.parentNode.querySelector(".quantity-control").getAttribute("style") !== "display: flex;") {
            event.target.parentNode.querySelector(".quantity-control").style.display = "flex";
            return;
        }
        event.target.parentNode.querySelector(".quantity-control").style.display = "none";
    }
    
    function generateDayDate(dayOfMonth, nextMonth) {
        let year = new Date().getFullYear();
        let month;
        if (nextMonth) {
            month = new Date().getMonth() + 1;
            if (month > 12) {
                month = 1;
            }
        } else if (dayOfMonth <= 0) {
            month = new Date().getMonth() + 1;
        } else {
            month = new Date().getMonth();
        }
        let dayOfWeek = new Date(year, month, dayOfMonth).getDay();
        let lastDayOfMonth = new Date(year, month, 0).getDate();
        switch (dayOfWeek) {
            case 1:
                dayOfWeek = "ПН"
                break;
            case 2:
                dayOfWeek = "ВТ"
                break;
            case 3:
                dayOfWeek = "СР"
                break;
            case 4:
                dayOfWeek = "ЧТ"
                break;
            case 5:
                dayOfWeek = "ПТ"
                break;
            case 6:
                dayOfWeek = "СБ"
                break;
            case 0:
                dayOfWeek = "ВС"
                break;
        }
        let dayDate = {}
        dayDate.dayOfWeek = dayOfWeek;
        dayDate.lastDayOfMonth = lastDayOfMonth;
        dayDate.month = month;
        return dayDate;
    }

    function generateWeekDate(firstDayDate) {
        let week = "";
        let dayName;
        for (let i = 0; i <= 6; i++) {
            let dayOfRender = generateDayDate(firstDayDate + i, dateDayOfNextMonth);
            if (firstDayDate <= 0) {
                generateDayDate(firstDayDate - i, dateDayOfNextMonth)
            }
            if (dayOfRender.month !==  todayMonth) {
            }
            if (dateDayOfNextMonth) {
                firstDayDate = 0 - i;
            }
            if (firstDayDate + 7 <= 0) {
                if (generateDayDate(firstDayDate - i, dateDayOfNextMonth).month > 0) {
                    let thisYear = new Date().getFullYear();
                    let thisMonth = new Date(thisYear).getMonth();
                    let monthAfterDays = new Date(thisYear, thisMonth - 1, 0).getDate();
                    firstDayDate  = monthAfterDays - 2;
                }
            }
            if (firstDayDate + i  === 0) {
                if (generateDayDate(firstDayDate - i, dateDayOfNextMonth).month > 0) {
                    let thisYear = new Date().getFullYear();
                    let thisMonth = new Date(thisYear).getMonth();
                    let monthAfterDays = new Date(thisYear, thisMonth - 1, 0).getDate();
                    firstDayDate  = monthAfterDays + 1;
                }
            }
            if (firstDayDate + i >= dayOfRender.lastDayOfMonth + 3) {
                dateDayOfNextMonthValid = true;

                firstDayDate = firstDayDate - dayOfRender.lastDayOfMonth - 2;
            }
            if (dayOfRender.dayOfWeek === "СБ" ||
                dayOfRender.dayOfWeek === "ВС") {
                dayName = `
                <p class="date-day-of-week date-day-of-week-output">${dayOfRender.dayOfWeek}</p>
                `
            } else {
                dayName = `
                <p class="date-day-of-week">${dayOfRender.dayOfWeek}</p>
                `
            }
            if (selectedDayDate === firstDayDate + i) {
                dayName = `
                <p style="color: rgb(255, 255, 255);" class="date-day-of-week date-day-of-week-output">${dayOfRender.dayOfWeek}</p>
                `
                week = ` ${week}
            <div style="background-color: rgb(255, 195, 105); color: rgb(255, 255, 255);" class="date-day">
            <b class="day-of-month">${firstDayDate + i}</b>
             ${dayName}
            </div>
            `
            } else {
                week = ` ${week}
            <div class="date-day">
            <b class="day-of-month">${firstDayDate + i}</b>
             ${dayName}
            </div>
            `
            }
        }

        document.querySelector(".date-list-days").innerHTML = week;
        let dataOfDateForAnaliz = {}
        dataOfDateForAnaliz.dateDayOfNextMonth = dateDayOfNextMonth;
        return dataOfDateForAnaliz.dateDayOfNextMonth;
    }

    function shiftCalendarToRight() {
        let firstDate = document.querySelector(".date-day:first-child .day-of-month").innerHTML;
        generateWeekDate(++firstDate);
    }

    function shiftCalendarToLeft() {
        let firstDate = document.querySelector(".date-day:first-child .day-of-month").innerHTML;
        if (today >= firstDate && !dateDayOfNextMonthValid) {
            return;
        }
        generateWeekDate(firstDate - 1);
    }
    
    function checkedDay(event) {
        if (event.target.getAttribute("class") !== "date-day" &&
            event.target.parentNode.getAttribute("class") !== "date-day") {
            return;
        }//job
        let target = event.target;
        target = event.target.parentNode.getAttribute("class") === "date-day"?
            event.target.parentNode:
            target;
        
        let week = document.querySelectorAll(".date-day");
        for (let i = 0; i < 7; i++) {
            week[i].removeAttribute("style");
        }

        target.style.backgroundColor = "#FFC369";
        target.style.color = "#FFF";

        target.querySelector("p").style.color = "#FFF";

        if (target.querySelector("p").getAttribute("class") === "date-day-of-week date-day-of-week-output") {
            document.querySelector(".button-select-time").innerHTML = `
                            <div class="select-time">10:00 - 11:00</div>
                            <div class="select-time">15:00 - 16:00</div>
            `
            return
        }
        document.querySelector(".button-select-time").innerHTML = `
                            <div class="select-time">10:00 - 11:00</div>
                            <div class="select-time">12:00 - 13:00</div>
                            <div class="select-time">15:00 - 16:00</div>
            `
        selectedDayDate = +target.querySelector(".day-of-month").innerHTML;
    }

    function checkedTime(event) {
        if (event.target.getAttribute("class") !== "select-time") {
            return;
        }
        let timeList = document.querySelectorAll(".select-time");
        for (let i = 0; i < timeList.length; i++) {
            timeList[i].removeAttribute("style");
        }
        selectedTimeDate = event.target.innerHTML;
        event.target.style.color = "#FFF";
        event.target.style.backgroundColor = "#FFC369";
    }
    
    function priceСalculation(target) {
       let price = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price-selection-water-volume").innerHTML;
        //stop developoment
    }

    let dateDayOfNextMonth;
    let dateDayOfNextMonthValid = false;
    let selectedDayDate;
    let selectedTimeDate;
    let codeOfGeneration = [
        {
            volume: "18,9",
            quantity: "1",
            price: "220",
        },
        {
            volume: "1,5",
            quantity: "6",
            price: "175",
        },
        {
            volume: "0.5",
            quantity: "12",
            price: "270",
        },
    ]

    const today = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const userData = {
        quantityOfGoods: 0,
    };
    let processValidationPass = {
        validationNamePassed: false,
        validationPhoneNumberPassed: false,
        validationEmailPassed: false,
        validationAddressPassed: false,
        validationAcceptingAgreement: false,
    };
    generateWeekDate(today);
    renderSelectionWaterVolume(codeOfGeneration);

    document.querySelector(".user-name").addEventListener("blur", fieldValidationName);
    document.querySelector(".user-phone-number").addEventListener("blur", fieldValidationPhoneNumber);
    document.querySelector(".user-email").addEventListener("blur", fieldValidationEmail);
    document.querySelector(".user-address").addEventListener("blur", fieldValidationAddress);
    document.querySelector(".accept-agreement").addEventListener("click", checkboxValidationAcceptingAgreement);
    document.querySelector(".trigger-of-event-next-order-dtely").addEventListener("click", transitionToOrderDetals);
    document.querySelector(".button-return-to-previous-stage").addEventListener("click", buttonReturnToPreviousStage);
    document.querySelector(".selection-water-volume").addEventListener("click", chooseProduct);
    document.querySelector(".selection-water-volume").addEventListener("click", controlSelectionParty);
    document.querySelector(".label-accept-agreement").addEventListener("click", checkedCheckboxOfLabel);
    document.querySelector(".start-order").addEventListener("click", transitionToOrder);
    document.querySelector(".select-date-scroll-date-right").addEventListener("click", shiftCalendarToRight);
    document.querySelector(".select-date-scroll-date-left").addEventListener("click", shiftCalendarToLeft);
    document.querySelector(".select-date-days").addEventListener("click", checkedDay);
    document.querySelector(".container-select-time").addEventListener("click", checkedTime);
})();

