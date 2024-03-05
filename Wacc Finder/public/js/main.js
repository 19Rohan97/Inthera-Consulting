/**
 * Mobile Navigation
 */

(function mobileFooter(i18n) {
  var i18n = i18n ? i18n : { current: "current" },
    navs = document.querySelectorAll("nav.mobile-footer");
  [].forEach.call(navs, function (nav, index) {
    var a = 0,
      c = 0,
      i = 1, // active, current, increment
      links = nav.getElementsByTagName("a"),
      line = nav.querySelector(".line");
    if (!line) {
      line = document.createElement("i");
      line.setAttribute("aria-hidden", true);
      line.className = "line";
      line.innerHTML = i18n.current;
      nav.appendChild(line);
    }
    line.id = "nav-current" + index;
    if (!line.innerHTML.length) line.innerHTML = i18n.current;
    [].forEach.call(links, function (link, index) {
      link.removeAttribute("aria-describedby");
      if (link.className.match(/\bactive\b/g)) place(line, link);
      link.addEventListener("click", function (e) {
        a = index;
        var t = setInterval(function () {
          links[c].classList.remove("traversing");
          links[c].classList.remove("active");
          if (a > c) i = 1;
          else if (a < c) i = -1;
          c += i;
          links[c].classList.add("traversing");
          if (c != -1) {
            links[c - i].classList.remove("active");
          }
          if (c == a) {
            e.target.classList.remove("traversing");
            e.target.classList.add("active");
            i = 0;
            clearInterval(t);
          }
        }, 100); // Traversing hilite: min: 100ms
        place(line, e.target);
      });
    });
  });
  function place(l, a) {
    a.setAttribute("aria-describedby", l.id || "nav-current");
    l.style.width = a.offsetWidth + "px";
    l.style.left = a.offsetLeft + a.offsetWidth / 2 + "px";
  }
})();

/**
 * Sticky Header
 */
// Check if the element with ID 'main_header' exists before adding scroll event listener
if (document.getElementById("main_header")) {
  window.addEventListener("scroll", function () {
    var header = document.getElementById("main_header");
    var scrollPosition = window.scrollY;

    // Add or remove 'fixed' class based on scroll position
    if (scrollPosition > 1) {
      // Example threshold, adjust as needed
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

// Function to get user initials
function getUserInitials(name) {
  var initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return initials;
}

$(document).ready(function () {
  if ($("#login")) {
    // Validate Email on keyup
    $('input[name="email"]').on("keyup", function () {
      var email = $(this).val().trim();
      if (email.length === 0 || !validateEmail(email)) {
        addError($(this), "Please enter a valid email address.");
      } else {
        removeError($(this));
      }
    });

    // Validate Password on keyup
    $('input[name="password"]').on("keyup", function () {
      var password = $(this).val().trim();
      if (password.length < 8) {
        addError($(this), "Your password must be at least 8 characters long.");
      } else {
        removeError($(this));
      }
    });

    // Function to validate email using regex
    function validateEmail(email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    // Function to add error display
    function addError(element, message) {
      element.addClass("error-input");
      element.next(".error-message").remove(); // Remove existing message to prevent duplicates
      var errorMessage = $('<div class="error-message">' + message + "</div>");
      element.after(errorMessage);
    }

    // Function to remove error display
    function removeError(element) {
      element.removeClass("error-input");
      element.next(".error-message").remove();
    }
  }

  /**
   * Custom Avatar Creation
   */
  if ($("#account")) {
    // Get user's full name from the element with class "full-name"
    var fullName = $(".full-name").text();

    // Get user initials
    var initials = getUserInitials(fullName);

    // Create image element with initials as text
    var img = $('<div class="pp"></div>').text(initials);

    // Append image to the div with id "avatar"
    $("#pp").append(img);
  }
});
