import Order from "/api/wjst/order";
import Event from "/api/wjst/event";
import Dom from "/api/wjst/dom";

Order.currency = "uah";
const settedClicks = {};
const setClicks = (product_id = "") => {
	if (
		!Dom.exists("addToCart" + product_id) ||
		settedClicks[product_id]
	) {
		return;
	}
	settedClicks[product_id] = true;

	Dom.click("addToCart" + product_id, () => {
		Order.toggleProduct(
			Dom.attr("addToCart" + product_id, "product_id"),
			Dom.attr("addToCart" + product_id, "product_price")
		);

		cartButton();
	});

	Dom.click("addToCartAndPay" + product_id, async () => {
		const product_id = Dom.attr("addToCart" + product_id, "product_id");

		const hasProduct = await Order.hasProduct(product_id);

		if (!hasProduct) {
			await Order.toggleProduct(
				product_id,
				Dom.attr("addToCart" + product_id, "product_price")
			);
		}

		window.location.href = "/cart";
	});
};
const cartButtonText = async (product_id = "") => {
	if (!Dom.exists("addToCart" + product_id)) return;

	const hasProduct = await Order.hasProduct(
		Dom.attr("addToCart" + product_id, "product_id")
	);

	if (hasProduct) {
		Dom.replace("addToCart" + product_id, "REMOVE FROM CART");
	} else {
		Dom.replace("addToCart" + product_id, "ADD TO CART");
	}
};
const cartButton = async () => {
	cartButtonText();
	setClicks();
	Order.eachProduct((product_id) => {
		cartButtonText(product_id);
		setClicks(product_id);
	});
};
const set_order = (order) => {
	Dom.replace(
		"cart",
		Dom.template("cart", {
			counter: order.products.length,
		})
	);

	cartButton();
};
Event.on("order_load", set_order);
Event.on("order_update", set_order);
Event.on("order_pay", set_order);

/* template specific code */
const nav = document.querySelector(".topbar__button");
const body = document.body;

nav.addEventListener("click", () => {
	body.classList.toggle("_lock");
});

window.addEventListener("scroll", reveal);

function reveal() {
	let reveals = document.querySelectorAll(".reveal");

	for (let i = 0; i < reveals.length; i++) {
		let windowheight = window.innerHeight;
		let revealtop = reveals[i].getBoundingClientRect().top;
		let revealpoint = 150;

		if (revealtop < windowheight - revealpoint) {
			reveals[i].classList.add("reveal_active");
		} else {
			reveals[i].classList.remove("reveal_active");
		}
	}
}

/* let filtersItems = document.querySelectorAll(".filter-item__title");

filtersItems.forEach(function (element) {
	element.addEventListener("click", function () {
		let sibling = this.nextElementSibling;
		let items = document.querySelectorAll(".filter-item__wrapper");
		let btns = document.querySelectorAll(".filter-item__title_active");

		if (!sibling.classList.contains("filter-item__wrapper_active")) {
			items.forEach((elem) => {
				elem.classList.remove("filter-item__wrapper_active");
			});

			btns.forEach((elem) => {
				elem.classList.remove("filter-item__title_active");
			});

			sibling.classList.add("filter-item__wrapper_active");

			element.classList.add("filter-item__title_active");
		} else {
			sibling.classList.remove("filter-item__wrapper_active");
			element.classList.remove("filter-item__title_active");
		}
	});
});

let filters = document.querySelectorAll(".filter__title");
let filtersButtons = document.querySelectorAll(".filter__button");

filters.forEach(function (element) {
	element.addEventListener("click", function () {
		let sibling = this.nextElementSibling;

		sibling.classList.toggle("filter__content_active");

		filtersButtons.forEach((elem) => {
			elem.classList.toggle("filter__button_active");
		});
	});
});

filtersButtons.forEach(function (element) {
	element.addEventListener("click", function () {
		let content = document.querySelectorAll(".filter__content");

		content.forEach((elem) => {
			elem.classList.remove("filter__content_active");
		});

		element.classList.toggle("filter__button_active");
	});
}); */

/* --------------------------------- Sliders -------------------------------- */

const landSlider = new Swiper(".land-section-slider", {
	speed: 2000,
	slidesPerView: 1,
	spaceBetween: 20,
	autoplay: true,
	loop: true,
	allowTouchMove: false,

	autoplay: {
		delay: 2000,
	},

	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
});

const countSlides = document.querySelectorAll(
	".main-slider .swiper-slide"
).length;

const main = new Swiper(".main-slider", {
	spaceBetween: 20,
	speed: 2000,
	slidesPerView: 1,
	// loop: countSlides > 1,
	autoplay: countSlides > 1,

	allowTouchMove: false,

	allowSlideNext: countSlides > 1,
	allowSlidePrev: countSlides > 1,

	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},

	autoplay: {
		delay: 3000,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

const articles = new Swiper(".articles__slider", {
	speed: 2000,
	slidesPerView: 3,
	spaceBetween: 20,
	loop: true,
	autoplay: true,

	autoplay: {
		delay: 4000,
	},

	breakpoints: {
		1100: {
			slidesPerView: 3,
			autoplay: false,
			allowTouchMove: false,
		},
		768: {
			slidesPerView: 2,
		},
		200: {
			slidesPerView: 1,
		},
	},
});

/* --------------------------------- /Sliders -------------------------------- */

Fancybox.bind("[data-fancybox]", {});

Fancybox.bind("[data-fancybox='gallery']", {});
