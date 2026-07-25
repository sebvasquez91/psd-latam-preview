/* Escuela Canina — front-end interactions. */
(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', function () {
		var toggle = document.querySelector('.nav-toggle');
		var nav = document.getElementById('site-navigation');
		if (toggle && nav) {
			toggle.addEventListener('click', function () {
				var open = nav.classList.toggle('is-open');
				toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
				document.body.classList.toggle('nav-open', open);
			});
		}
		var header = document.querySelector('.site-header');
		if (header) {
			var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
			onScroll();
			window.addEventListener('scroll', onScroll, { passive: true });
		}
		/* Chapter accordions on the course landing */
		document.querySelectorAll('.chapter__head').forEach(function (head) {
			head.addEventListener('click', function () {
				var item = head.closest('.chapter');
				if (item) {
					var open = item.classList.toggle('is-open');
					head.setAttribute('aria-expanded', open ? 'true' : 'false');
				}
			});
		});
		/* Smooth scroll for in-page anchors */
		document.querySelectorAll('a[href^="#"]').forEach(function (link) {
			link.addEventListener('click', function (e) {
				var id = link.getAttribute('href');
				if (id.length < 2) { return; }
				var t = document.querySelector(id);
				if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' }); }
			});
		});
		/* Localize LearnPress curriculum section names (plain DB strings) to
		   Spanish when the site is in ES. Re-runs briefly because LearnPress
		   can render/refresh the curriculum after load. */
		if (window.psdEscuelaL10n && psdEscuelaL10n.lang === 'es' && psdEscuelaL10n.sections) {
			var localizeSections = function () {
				document.querySelectorAll('.course-section__title, .course-section-title, .section-title').forEach(function (el) {
					var m = (el.textContent || '').match(/Chapter\s+(\d+)/i);
					var es = m && psdEscuelaL10n.sections[m[1]];
					if (es && el.textContent.trim() !== es) { el.textContent = es; }
				});
			};
			localizeSections();
			[400, 1200, 2500].forEach(function (t) { setTimeout(localizeSections, t); });
		}

		/* Reveal on scroll */
		var reveal = document.querySelectorAll('[data-reveal]');
		if ('IntersectionObserver' in window && reveal.length) {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-revealed'); io.unobserve(en.target); } });
			}, { threshold: 0.1 });
			reveal.forEach(function (el) { io.observe(el); });
		} else { reveal.forEach(function (el) { el.classList.add('is-revealed'); }); }
	});
})();
