/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module image/image/toggleimagetypecommand
 */

import { Command } from 'ckeditor5/src/core';
import { insertImage, isImage, isImageInline } from './utils';

/**
 * The image type toggle command. It is used to convert images between block and inline type.
 *
 * @extends module:core/command~Command
 */
export default class ToggleImageTypeCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const element = this.editor.model.document.selection.getSelectedElement();

		if ( !this.editor.plugins.has( 'ImageBlockEditing' ) || !this.editor.plugins.has( 'ImageInlineEditing' ) ) {
			this.isEnabled = false;
		} else {
			this.isEnabled = isImage( element ) || isImageInline( element );
		}
	}

	/**
	 * @inheritDoc
	 */
	execute() {
		const selection = this.editor.model.document.selection;
		const imageElement = selection.getSelectedElement();
		const src = imageElement.getAttribute( 'src' );
		const alt = imageElement.getAttribute( 'alt' );
		const srcset = imageElement.getAttribute( 'srcset' );
		const caption = imageElement.getAttribute( 'caption' );
		const imageType = isImage( imageElement ) ? 'imageInline' : 'image';

		if ( !src ) {
			return;
		}

		const attrs = { src };

		if ( alt ) {
			attrs.alt = alt;
		}

		if ( srcset ) {
			attrs.srcset = srcset;
		}

		if ( caption ) {
			attrs.caption = caption;
		}

		insertImage( this.editor, attrs, selection, imageType );
	}
}
