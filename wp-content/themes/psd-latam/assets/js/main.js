/* PSD Latam — front-end interactions (vanilla JS, no dependencies). */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		/* Mobile navigation toggle */
		var toggle = document.querySelector('.nav-toggle');
		var nav = document.getElementById('site-navigation');
		if (toggle && nav) {
			toggle.addEventListener('click', function () {
				var open = nav.classList.toggle('is-open');
				toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
				document.body.classList.toggle('nav-open', open);
			});
			/* Close menu when a link is tapped (mobile). */
			nav.querySelectorAll('a').forEach(function (a) {
				a.addEventListener('click', function () {
					nav.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
					document.body.classList.remove('nav-open');
				});
			});
		}

		/* Sticky header shadow on scroll */
		var header = document.querySelector('.site-header');
		if (header) {
			var onScroll = function () {
				header.classList.toggle('is-scrolled', window.scrollY > 8);
			};
			onScroll();
			window.addEventListener('scroll', onScroll, { passive: true });
		}

		/* Smooth scroll for in-page anchors */
		document.querySelectorAll('a[href^="#"]').forEach(function (link) {
			link.addEventListener('click', function (e) {
				var id = link.getAttribute('href');
				if (id.length < 2) { return; }
				var target = document.querySelector(id);
				if (target) {
					e.preventDefault();
					var top = target.getBoundingClientRect().top + window.scrollY - 90;
					window.scrollTo({ top: top, behavior: 'smooth' });
				}
			});
		});

		/* Accessible FAQ / toggle accordions */
		document.querySelectorAll('.accordion__item').forEach(function (item) {
			var btn = item.querySelector('.accordion__trigger');
			if (!btn) { return; }
			btn.addEventListener('click', function () {
				var open = item.classList.toggle('is-open');
				btn.setAttribute('aria-expanded', open ? 'true' : 'false');
			});
		});

		/* Reveal-on-scroll for elements marked [data-reveal] */
		var reveal = document.querySelectorAll('[data-reveal]');
		if ('IntersectionObserver' in window && reveal.length) {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-revealed');
						io.unobserve(entry.target);
					}
				});
			}, { threshold: 0.12 });
			reveal.forEach(function (el) { io.observe(el); });
		} else {
			reveal.forEach(function (el) { el.classList.add('is-revealed'); });
		}
	});
})();
