import * as Mixin from './util/mixin'
import { _canvas } from './Canvas'

function addEventListener(type, listener) {
	if (typeof listener !== 'function') {
		return;
	}

	this['on' + type] = (event = {}) => {
		listener.call(this, event)
	}
}

function removeEventListener(type, listener) {
	if (this['on' + type] === listener) {
		this['on' + type] = null;
	}
}

export default function Image() {
	let canvas = _canvas;
	if (!canvas) {
		throw new Error('please register a canvas')
	}
	const image = canvas.createImage();

	if (!('tagName' in image)) {
		image.tagName = 'IMG'
	}

	Mixin.parentNode(image);
	Mixin.classList(image);
	image.addEventListener = addEventListener.bind(image);
	image.removeEventListener = removeEventListener.bind(image);

	return image;
};
