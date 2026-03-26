(function () {
	const pageRoutes = {
		home: "index.html",
		televisions: "televisions.html",
		about: "about.html"
	};

	function setupNavigation() {
		const navLinks = document.querySelectorAll(".nav-link");
		navLinks.forEach((link) => {
			link.addEventListener("click", (event) => {
				const targetPage = link.getAttribute("data-target");
				if (!targetPage || !pageRoutes[targetPage]) {
					return;
				}
				event.preventDefault();
				window.location.href = pageRoutes[targetPage];
			});
		});

		const logoButton = document.querySelector(".logo-button");
		if (logoButton) {
			logoButton.addEventListener("click", (event) => {
				event.preventDefault();
				window.location.href = pageRoutes.home;
			});
		}
	}

	function setActiveNavigation() {
		const currentPage = document.body.getAttribute("data-page");
		const navLinks = document.querySelectorAll(".nav-link");

		navLinks.forEach((link) => {
			const isCurrent = link.getAttribute("data-target") === currentPage;
			link.classList.toggle("is-active", isCurrent);

			if (isCurrent) {
				link.setAttribute("aria-current", "page");
			} else {
				link.removeAttribute("aria-current");
			}
		});
	}

	function setFooterYear() {
		const yearNode = document.getElementById("current-year");
		if (yearNode) {
			yearNode.textContent = String(new Date().getFullYear());
		}
	}

	function escapeHtml(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	document.addEventListener("DOMContentLoaded", () => {
		setupNavigation();
		setActiveNavigation();
		setFooterYear();
	});
})();
