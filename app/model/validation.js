class Validation {
  checkEmpty(value, eId, message) {
    if (value == "") {
      document.getElementById(eId).innerHTML = message;
      document.getElementById(eId).style.display = "block";
      return false;
    }
    document.getElementById(eId).innerHTML = "";
    document.getElementById(eId).style.display = "none";
    return true;
  }

  checkExist(arr, value, eId, message) {
    let isExist = false;

    for (let i = 0; i < arr.length; i++) {
      const userItem = arr[i];
      if (userItem.user === value) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      document.getElementById(eId).innerHTML = message;
      document.getElementById(eId).style.display = "block";
      return false;
    }

    document.getElementById(eId).innerHTML = "";
    document.getElementById(eId).style.display = "none";
    return true;
  }

  checkCharacterName(value, eId, message) {
    let letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    }
    document.getElementById(eId).innerHTML = message;
    document.getElementById(eId).style.display = "block";
    return false;
  }

  checkEmail(value, eId, message) {
    let letter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value.match(letter)) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    }
    document.getElementById(eId).innerHTML = message;
    document.getElementById(eId).style.display = "block";
    return false;
  }

  checkPassword(value, eId, message) {
    let letter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    if (value.match(letter)) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    }
    document.getElementById(eId).innerHTML = message;
    document.getElementById(eId).style.display = "block";
    return false;
  }

  checkWorkDate(value, eId, message) {
    let letter = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (value.match(letter)) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    }
    document.getElementById(eId).innerHTML = message;
    document.getElementById(eId).style.display = "block";
    return false;
  }

  checkSalary(value, eId, message1, message2) {
    if (value >= 1000000 && value <= 20000000) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    } else if (value < 1000000) {
      document.getElementById(eId).innerHTML = message1;
      document.getElementById(eId).style.display = "block";
      return false;
    } else if (value > 20000000) {
      document.getElementById(eId).innerHTML = message2;
      document.getElementById(eId).style.display = "block";
      return false;
    }
  }

  checkSelectPostion(idSelect, eId, message) {
    const element = document.getElementById(idSelect);
    if (element.selectedIndex !== 0) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    }
    document.getElementById(eId).innerHTML = message;
    document.getElementById(eId).style.display = "block";
    return false;
  }

  checkWorkTime(value, eId, message) {
    if (value >= 80 && value <= 200) {
      document.getElementById(eId).innerHTML = "";
      document.getElementById(eId).style.display = "none";
      return true;
    }
    document.getElementById(eId).innerHTML = message;
    document.getElementById(eId).style.display = "block";
    return false;
  }
}

export default Validation;
