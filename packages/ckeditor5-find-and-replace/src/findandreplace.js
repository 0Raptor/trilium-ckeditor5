/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module find-and-replace/findandreplace
 */

import { Plugin } from 'ckeditor5/src/core';
import FindAndReplaceUI from './findandreplaceui';
import FindAndReplaceEditing from './findandreplaceediting';

/**
 * The find and replace plugin.
 *
 * For a detailed overview, check the {@glink features/find-and-replace Find and replace feature documentation}.
 *
 * This is a "glue" plugin which loads the following plugins:
 *
 * * The {@link module:find-and-replace/findandreplaceediting~FindAndReplaceEditing find and replace editing feature},
 * * The {@link module:find-and-replace/findandreplaceui~FindAndReplaceUI find and replace UI feature}
 *
 * @extends module:core/plugin~Plugin
 */
export default class FindAndReplace extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FindAndReplaceEditing, FindAndReplaceUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'FindAndReplace';
	}

	init() {
		const ui = this.editor.plugins.get( 'FindAndReplaceUI' );
		const findAndReplaceEditing = this.editor.plugins.get( 'FindAndReplaceEditing' );

		/**
		 * Delegate find next request.
		 */
		ui.on( 'findNext', ( event, data ) => {
			if ( data.searchText.length !== 0 ) {
				findAndReplaceEditing.stop();
			}

			// findAndReplaceEditing.state.searchText = data.searchText;

			// this.editor.execute( 'find' );

			findAndReplaceEditing.find( data.searchText );
		} );

		/**
		 * Delegate find previous request.i
		 */
		ui.on( 'findPrev', ( event, data ) => {
			if ( data.searchText.length !== 0 ) {
				findAndReplaceEditing.stop();
			}

			// findAndReplaceEditing.state.searchText = data.searchText;

			findAndReplaceEditing.find( data.searchText );
		} );

		/**
		 * Delegate replace action.
		 */
		ui.on( 'replace', ( event, data ) => {
			this.editor.execute( 'replace', data.replaceText, findAndReplaceEditing.activeResults.get( 0 ) );
			// @todo: it should be possible to make replacement without prior find call.
		} );

		/**
		 * Delegate replace all action.
		 */
		ui.on( 'replaceAll', ( event, data ) => {
			// this.editor.execute( 'replaceAll', data.replaceText, data.searchText );
			// Without referencing findAndReplaceEditing.activeResults the on `onDocumentChange` method throws if you attempt
			// to perform replace all on editor that has already some find results matched.
			this.editor.execute( 'replaceAll', data.replaceText, findAndReplaceEditing.activeResults );
		} );

		ui.on( 'dropdown:closed', () => {
			findAndReplaceEditing.stop();
		} );
	}
}
