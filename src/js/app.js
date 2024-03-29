// Localization Selector handle Event Listener
document.querySelectorAll('[aria-controls="dropdown-popover"]').forEach(function(el, target) {
    el.setAttribute("aria-controls", el.getAttribute("aria-controls") + "-" + target);
    el.nextElementSibling.setAttribute("id", el.getAttribute("aria-controls"));
    el.addEventListener('click', function(e) {
        let popover = el.nextElementSibling;
        if (popover.getAttribute('aria-hidden') === 'true') {
            popover.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            popover.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    });

    // Outside click listener
    document.addEventListener('click', function(e) {
        if (e.target !== el) {
            let popover = el.nextElementSibling;
            if (popover.getAttribute('aria-hidden') === 'false' && !popover.contains(e.target)) {
                popover.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Search box handle Event Listener
document.querySelector('[data-action="ws-toggle-search"]').addEventListener('click', function(e) {
    e.preventDefault();
    let search = document.getElementById(e.target.getAttribute("data-action"));
    let overLay = document.querySelector('.ws--page-overlay');
    if (search.getAttribute('aria-hidden') === 'true') {
        search.setAttribute('aria-hidden', 'false');
        // Focus on the search input
        search.querySelector("input[type='search']").focus();
    } else {
        search.setAttribute('aria-hidden', 'true');
    }

    // Toggle the overlay
    overLay.classList.toggle('is-ws-visible');

    // add click listener for disable search
    document.querySelector('[data-action="ws-close-search"]').addEventListener('click', function(e) {
        e.preventDefault();
        search.setAttribute('aria-hidden', 'true');
        // Toggle the overlay
        overLay.classList.toggle('is-ws-visible');
    });
});

// Main Dropdown Menu And Mega Menu handle Event Listener
document.querySelectorAll('[aria-hasdropdown="true"]').forEach(function(el) {
    // Dropdown Menu handle mouse hover Event Listener
    el.addEventListener('mouseenter', function(e) {
        // Set the dropdown menu to visible
        el.classList.add('is-ws-visible');
        let dropdown = el.children[1];
        dropdown.setAttribute('aria-hidden', 'false');
    });


    // Dropdown Menu handle mouse leave Event Listener
    el.addEventListener('mouseleave', function(e) {
        closeDropdown();
    });
});

// Close Dropdown Menu
function closeDropdown() {
    document.querySelectorAll('[aria-hasdropdown="true"]').forEach(function(el) {
        if (el.classList.contains('is-ws-visible')) {
            el.classList.remove('is-ws-visible');
            el.children[1].setAttribute('aria-hidden', 'true');
        }
    });
}

// Sidebar Menu handle Event Listener
document.querySelectorAll('[data-action="open-drawer"]').forEach(function(el) {
    // Get the drawer element
    let drawer = document.querySelector('[data-section-type="' + el.dataset.drawerId + '"]');
    let overLay = document.querySelector('.ws--page-overlay');
    // Sidebar Menu handle click Event Listener
    el.addEventListener('click', function(e) {
        // Toggle the drawer attribute
        drawer.setAttribute('aria-hidden', 'false');
        // Toggle the overlay
        overLay.classList.toggle('is-ws-visible');
        
        // Close the drawer
        drawer.querySelector('[data-action="close-drawer"]').addEventListener('click', function(e) {
            drawer.setAttribute('aria-hidden', 'true');
            // Toggle the overlay
            overLay.classList.toggle('is-ws-visible');
        });
    });

    // outside click listener
    document.addEventListener('click', function(e) {
        if (e.target !== el) {
            if (drawer.getAttribute('aria-hidden') === 'false' && !drawer.contains(e.target)) {
                // Toggle the drawer attribute
                drawer.setAttribute('aria-hidden', 'true');
                // Toggle the overlay
                overLay.classList.toggle('is-ws-visible');
            }
        }
    });
});

// Lazy Load Images using Intersection Observer
(function () {
	var observer = new IntersectionObserver(onIntersect);
    var observerBg = new IntersectionObserver(onIntersectBg);

    // Get all the images
	document.querySelectorAll("[data-lazy]").forEach((img) => {
		observer.observe(img);
	});

    // Get all bg images
    document.querySelectorAll("[data-lazy-bg]").forEach((img) => {
		observerBg.observe(img);
	});

    // Intersection Observer Callback function For BG Images
    function onIntersectBg(entries) {
        entries.forEach((entry) => {
			if (entry.target.getAttribute("data-processed") || !entry.isIntersecting) {
                return true;
            }
            entry.target.classList.add('ws--image-lazy-loading');
            if (entry.target.getAttribute("data-src")) {
                entry.target.style.backgroundImage = "url(" + entry.target.getAttribute("data-src") + ")";
            }
			entry.target.setAttribute("data-processed", true);
            entry.target.classList.remove("ws--image-lazy-load");
            entry.target.classList.remove("ws--image-lazy-loading");
            entry.target.classList.add("ws--image-lazy-loaded");
		});
    }

    // Intersection Observer Callback function For Images
	function onIntersect(entries) {
		entries.forEach((entry) => {
			if (entry.target.getAttribute("data-processed") || !entry.isIntersecting) {
                return true;
            }
            entry.target.classList.add('ws--image-lazy-loading');
            entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
			entry.target.setAttribute("data-processed", true);
            entry.target.classList.remove("ws--image-lazy-load");
            entry.target.classList.remove("ws--image-lazy-loading");
            entry.target.classList.add("ws--image-lazy-loaded");
		});
	}
})();


// // Recall the flickity slider when the window is resized
// window.addEventListener('resize', function(e) {
//     document.querySelectorAll('[data-flickity]').forEach(function(el) {
//         // el.flickity('resize');
//     });
// });

// Recall the flickity slider when the display mode is changed for an element
document.querySelectorAll('.ws--nav-tab-link').forEach(function(el) {
    el.addEventListener('click', function(e) {
        // Get the paranet element
        let parent = e.target.parentElement;
        let tab = parent.getAttribute('data-bs-target');
        let tabContent = document.querySelector(tab);
        // Get the flickity slider
        let slider = tabContent.querySelector('[data-flickity]');
        setHeightFlikityItems();
        // Resize the slider
        Flickity.data(slider).reloadCells();
        // tabContent.flickity('resize');
        // document.querySelectorAll('[data-flickity]').forEach(function(element) {
        //     Flickity.data(element).resize();
        //     console.log(element);
        // });
    });
});

// var tabEl = document.querySelector('button[data-bs-toggle="tab"]');
// tabEl.addEventListener('hide.bs.tab', function (event) {
//     let newActive = event.relatedTarget;
//     console.log(newActive);
//     let newTab = newActive.getAttribute('data-bs-target');
//     let newTabContent = document.querySelector(newTab);
//     let slider = newTabContent.querySelector('[data-flickity]');
//     Flickity.data(slider).resize();
// })



// bind event listener for the product carousel
document.addEventListener('DOMContentLoaded', setHeightFlikityItems);


// Set the height of the product carousel
function setHeightFlikityItems() {
    let flickity = document.querySelectorAll('[data-flickity]');
    flickity.forEach(function(el) {
        let getSilders = el.children;
        // Find the slider element max height and set it to the slider
        for (let i = 0; i < getSilders.length; i++) {
            getSilders[i].style.height = getSilders[i].offsetHeight + 'px';
        }
    });
}

// Quantity Incrementer and Decrementer
document.querySelectorAll('[data-action="quantity-increment"]').forEach(function(el) {
    // Get the decrementer element
    let decrementer = el.querySelector('[data-action="decrement"]');
    // Get the Incrementer element
    let incrementer = el.querySelector('[data-action="increment"]');
    // Get the input element
    let input = el.querySelector('[data-action="quantity"]');
    // Increment the value
    incrementer.addEventListener('click', function(e) {
        let value = parseInt(input.value);
        input.value = value + 1;
    });

    // Decrement the value
    decrementer.addEventListener('click', function(e) {
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    });
});
