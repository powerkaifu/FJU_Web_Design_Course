const changeThemeBtn = document.querySelector('#change-theme')
changeThemeBtn.addEventListener('click', changeTheme)

function changeTheme() {
	const randomColor = gsap.utils.random([
		'255, 180, 50', // 亮橙色
		'255, 255, 0', // 黃色
		'0, 255, 0', // 綠色
		'173, 216, 230', // 淺藍色
		'0, 255, 255', // 青色
		'255, 105, 180', // 粉紅色
		'0, 204, 255', // 電藍色
		'0, 255, 127', // 春天綠
		'102, 255, 0', // 霓虹綠
		'255, 0, 255', // 紫紅色
		'255, 20, 147', // 深粉紅色
		'255, 165, 0' // 橙色
	])

	const [r, g, b] = randomColor.split(',').map(Number)
	const hue = rgbToHue(r, g, b)

	gsap.to(document.documentElement, {
		duration: 1,
		'--themeColor': randomColor,
		'--hue': `${hue - 90}deg`, // 偏移調整色相
		ease: 'power2.out'
	})

	const video = document.querySelector('.video-container video')
	gsap.to(video, {
		duration: 1,
		filter: `contrast(150%) brightness(120%) sepia(100%) hue-rotate(${hue - 90}deg)`,
		ease: 'power2.out',
		onComplete: () => {
			video.style.filter = ''
		}
	})

	// 背景漸變
	gsap.to('#task-wrap', {
		'--blur': '5px',
		duration: 3,
		repeat: -1,
		repeatDelay: gsap.utils.random(3, 6),
		yoyo: true,
		ease: 'back.inOut(1.7)'
	})
}

// RGB 轉 Hue 函數
function rgbToHue(r, g, b) {
	r /= 255
	g /= 255
	b /= 255
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h

	if (max === min) {
		h = 0 // 未定義，設為 0
	} else if (max === r) {
		h = (60 * ((g - b) / (max - min)) + 360) % 360
	} else if (max === g) {
		h = 60 * ((b - r) / (max - min)) + 120
	} else {
		h = 60 * ((r - g) / (max - min)) + 240
	}

	return Math.round(h)
}

// 切換影片 -----------------------------------------------------------------------------------------------------------
let toggleMovie = false
let isAnimating = false

function changeMovie() {
	if (isAnimating) return // 防止連續點擊

	const video = document.querySelector('.video-container video')
	const source = document.querySelector('#movie')

	isAnimating = true

	gsap.to(video, {
		opacity: 0,
		duration: 2,
		ease: 'power2.in',
		onComplete: () => {
			// 切換影片來源
			source.src = toggleMovie ? './movie/space1.mp4' : './movie/space2.mp4'
			video.load()
			video.play()

			// 淡入新影片
			gsap.to(video, {
				opacity: 1,
				duration: 1,
				ease: 'power2.out',
				onComplete: () => {
					isAnimating = false
				}
			})

			// 改變狀態
			toggleMovie = !toggleMovie
		}
	})
}

// 添加事件監聽器
const changeMovieBtn = document.querySelector('#change-movie')
changeMovieBtn.addEventListener('click', changeMovie)
// GSAP 動畫 -----------------------------------------------------------------------------------------------------------
gsap.to('body', {
	duration: 10,
	backgroundPosition: '100% 100%',
	repeat: -1,
	yoyo: true,
	ease: 'power1.inOut'
})

gsap.to('#task-wrap', {
	'--blur': '5px',
	duration: 3,
	repeat: -1,
	repeatDelay: gsap.utils.random(3, 6),
	yoyo: true,
	ease: 'back.inOut(1.7)'
})

gsap.to('.grid', {
	backgroundPosition: '0 -25px',
	duration: 1,
	repeat: -1,
	ease: 'linear'
})

const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })
let yPos = -50
let staggerNum = 0.2

tl.from('#main-title', {
	opacity: 0,
	y: yPos,
	duration: 1
})
	.from('#task-menu ul li', {
		opacity: 0,
		y: yPos,
		stagger: staggerNum
	})
	.from('#task-wrap', {
		opacity: 0,
		y: yPos,
		duration: 1.5
	})
