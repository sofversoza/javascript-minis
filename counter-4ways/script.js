let inputText = document.querySelector(".input-text")
let wordCount = document.querySelector(".word-count")
let charCount = document.querySelector(".char-count")
let sentenceCount = document.querySelector(".sentence-count")
let paragraphCount = document.querySelector(".paragraph-count")

inputText.addEventListener("input", () => {
	// character count including spaces
	// charCount.textContent = inputText.value.length

	// character count without spaces
	charCount.textContent = inputText.value.replace(/\s+/g, "").length

	// remove whitespaces from input text
	let textTrim = inputText.value.trim()

	// count words
	wordCount.textContent = textTrim.split(/\s+/).filter((item) => item).length

	// count sentences
	sentenceCount.textContent = textTrim.split(".").filter((item) => item).length

	// count paragraphs
	paragraphCount.textContent = textTrim
		.split("\n\n")
		.filter((item) => item).length
})
