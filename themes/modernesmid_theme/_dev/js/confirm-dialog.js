class ConfirmDialog {
  constructor({questionText, trueButtonText, trueButtonClass, falseButtonText, falseButtonClass, parent, titleText}) {
    this.titleText = titleText || "Let op!";
    this.questionText = questionText || "Weet u zeker dat u verder wilt gaan?";
    this.trueButtonText = trueButtonText || "Ja, ga door!";
    this.trueButtonClass = trueButtonClass || "btn-success";
    this.falseButtonText = falseButtonText || "Nee, wijzigen";
    this.falseButtonClass = falseButtonClass || "btn-danger";
    this.parent = parent || document.body;

    this.dialog = undefined;
    this.trueButton = undefined;
    this.falseButton = undefined;

    this._createDialog();
    this._appendDialog();
  }

  confirm() {
    return new Promise((resolve, reject) => {
      const somethingWentWrongUponCreation =
        !this.dialog || !this.trueButton || !this.falseButton;
      if (somethingWentWrongUponCreation) {
        reject('Er ging iets mis bij het aanmaken van het dialoogvenster.');
        return;
      }

      this.dialog.showModal();
      this.falseButton.focus();

      this.trueButton.addEventListener("click", () => {
        resolve(true);
        this._destroy();
      });

      this.falseButton.addEventListener("click", () => {
        resolve(false);
        this._destroy();
      });
    });
  }

  _createDialog() {
    this.dialog = document.createElement("dialog");
    this.dialog.style.display = 'block';
    this.dialog.style.border = 0;
    this.dialog.style.backgroundColor = 'transparent';
    this.dialog.classList.add("modal", "fade", "show");

    const divDialog = document.createElement("div");
    divDialog.classList.add("modal-dialog", "modal-dialog-centered");

    const divContent = document.createElement("div");
    divContent.classList.add("modal-content");

    //Header
    const divHeader = document.createElement("div");
    divHeader.classList.add("modal-header","text-center");
    const title = document.createElement("div");
    title.classList.add("modal-title", "h5", "text-center", "text-dark");
    title.textContent = this.titleText;
    divHeader.appendChild(title);

    //Body
    const divBody = document.createElement("div");
    divBody.classList.add("modal-body", "overflow-auto", "p-4");

    const parser = new DOMParser();
    const question = parser.parseFromString(this.questionText, 'text/html');

    divBody.appendChild(question.all[0].lastElementChild.firstElementChild);

    //Footer
    const divFooter = document.createElement("div");
    divFooter.classList.add("modal-footer");

    //Buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("confirm-dialog-button-group", "btn-group", "w-100");

    this.falseButton = document.createElement("button");
    this.falseButton.id = "false-button";
    this.falseButton.classList.add(
      "confirm-dialog-button",
      "confirm-dialog-button--false",
      "btn",
      "btn-warning",
      "w-50",
      this.falseButtonClass
    );
    this.falseButton.type = "button";
    this.falseButton.textContent = this.falseButtonText;
    this.falseButton.autofocus = true;
    buttonGroup.appendChild(this.falseButton);

    this.trueButton = document.createElement("button");
    this.trueButton.id = "true-button";
    this.trueButton.classList.add(
      "confirm-dialog-button",
      "confirm-dialog-button--true",
      "btn",
      "btn-success",
      "w-50",
      this.trueButtonClass
    );
    this.trueButton.type = "button";
    this.trueButton.textContent = this.trueButtonText;
    this.trueButton.autofocus = false;
    buttonGroup.appendChild(this.trueButton);

    divFooter.appendChild(buttonGroup);


    divContent.appendChild(divHeader);
    divContent.appendChild(divBody);
    divContent.appendChild(divFooter);

    divDialog.appendChild(divContent);

    this.dialog.appendChild(divDialog);
  }

  _appendDialog() {
    this.parent.appendChild(this.dialog);
  }

  _destroy() {
    this.parent.removeChild(this.dialog);
    delete this;
  }
}

export default ConfirmDialog;
