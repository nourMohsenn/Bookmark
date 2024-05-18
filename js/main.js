var bookMarkName = document.getElementById('bookMarkName');
var bookMarkUrl = document.getElementById('bookMarkUrl');
var check = document.getElementById('check');
var bookMarkList = [];

if (localStorage.getItem("bookmark")) {
    bookMarkList = JSON.parse(localStorage.getItem("bookmark"))
    displayBookMarks();
}

function addBookMark() {
    bookMarks = {
        name: bookMarkName.value,
        url: bookMarkUrl.value
    }
    if (validBookMarkName() && validBookMarkUrl()) {
        bookMarkList.push(bookMarks);
        localStorage.setItem("bookmark", JSON.stringify(bookMarkList));
    }
    else {
        check.innerHTML = `<div class="modal fade show " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block;background-color:rgba(0,0,0,.5);">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content p-3">
            <div class="modal-header border-bottom-0 py-4">
            <i class="fa-solid fa-circle text-danger px-1 fs-5"></i>
            <i class="fa-solid fa-circle text-warning px-1 fs-5"></i>
            <i class="fa-solid fa-circle text-success px-1 fs-5"></i>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeModel()"></button>
            </div>
            <div class="modal-body text-start ">
              <h5 class="fw-bold pb-3">Site Name or Url is not valid, Please follow the rules below:</h5>
              <p><i class="fa-regular fa-circle-right text-danger px-2 fs-5"></i>Site name must contain at least 3 characters</p>
              <p><i class="fa-regular fa-circle-right text-danger px-2 fs-5"></i>Site URL must be a valid one</p>
            </div>
          </div>
        </div>
      </div>`
    }
    // if(validBookMarkUrl())
    //     console.log("helloooooooooooooo");
    // else
    // console.log("Noooooooooooooooooooooo");

    displayBookMarks();
    clearForm();
}

function closeModel() {
    check.innerHTML = ``

}

function displayBookMarks() {
    var temp = '';
    for (var i = 0; i < bookMarkList.length; i++) {
        temp += `<tr>
        <td>`+ (i + 1) + `</td>
        <td>`+ bookMarkList[i].name + `</td>
        <td><a class="btn btn-green" target="_blank" href="https://`+ bookMarkList[i].url + `"><i class="fa-solid fa-eye pe-2"></i>visit</a></td>
        <td><button class="btn btn-danger text-white" onclick="deleteBookMarks(`+ i + `)"><i class="fa-solid fa-trash-can pe-2"></i>delete</button></td>
        </tr>`

    }
    document.getElementById('tableRows').innerHTML = temp;
}

function deleteBookMarks(index) {
    bookMarkList.splice(index, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookMarkList))
    displayBookMarks();
}

function clearForm() {
    bookMarkName.value = '';
    bookMarkUrl.value = '';
    bookMarkName.style.boxShadow = "0 0 0 0";
    bookMarkName.style.border = "0"
    bookMarkUrl.style.boxShadow = "0 0 0 0";
    bookMarkUrl.style.border = "0"
}

function validBookMarkName() {
    if (bookMarkName.value.length < 3) {
        bookMarkName.style.boxShadow = "0 0 0 .25rem #f0beb7"
        bookMarkName.style.border = "1px solid red"
        return false;
    }
    else {
        bookMarkName.style.boxShadow = "0 0 0 .25rem #bfd3bb"
        bookMarkName.style.border = "1px solid  #309263"
        return true;
    }

}

function validBookMarkUrl() {
    var checkss;
    var pattern2 = /[a-z][.][a-z]{2}/;
    checkss = pattern2.test(bookMarkUrl.value);
    console.log(checkss);
    if (pattern2.test(bookMarkUrl.value) === true) {
        bookMarkUrl.style.boxShadow = "0 0 0 .25rem #bfd3bb"
        bookMarkUrl.style.border = "1px solid  #309263"
        return true;
    }
    else {
        bookMarkUrl.style.boxShadow = "0 0 0 .25rem #f0beb7"
        bookMarkUrl.style.border = "1px solid red"
        return false;
    }
}