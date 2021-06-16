/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module find-and-replace/findandreplaceui
 */

import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, SplitButtonView } from 'ckeditor5/src/ui';
import 'ckeditor5/packages/ckeditor5-ui/theme/components/responsive-form/responsiveform.css';
import '../theme/findandreplaceform.css';
import FindAndReplaceFormView from './ui/findandreplaceformview';

import loupeIcon from '../theme/icons/find-replace.svg';

/**
 * Example Find & Replace UI that uses FindAndReplace plugin API.
 *
 * It demonstrates how to use that API form outside the editor (except UI buttons).
 *
 * @extends module:core/plugin~Plugin
 */
export default class FindAndReplaceUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'FindAndReplaceUI';
	}

	constructor( editor ) {
		super( editor );

		this.set( 'searchText' );
		this.set( 'replaceText' );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		this.activeSearch = null;
		this.findAndReplacePlugin = this.editor.plugins.get( 'FindAndReplace' );

		const editor = this.editor;

		editor.ui.componentFactory.add( 'findAndReplace', locale => {
			const dropdown = createDropdown( locale, SplitButtonView );

			const formView = new FindAndReplaceFormView( editor.locale );

			formView.delegate( 'findNext' ).to( this );
			formView.delegate( 'findPrev' ).to( this );
			formView.delegate( 'replace' ).to( this );
			formView.delegate( 'replaceAll' ).to( this );

			this._createToolbarDropdown( dropdown, loupeIcon );

			dropdown.panelView.children.add( formView );

			dropdown.on( 'change:isOpen', ( event, name, value ) => {
				if ( !value ) {
					this.fire( 'dropdown:closed' );
				}
			} );

			return dropdown;
		} );
	}

	/**
	 * @private
	 * @param {module:ui/dropdown/dropdownview~DropdownView} dropdown
	 */
	_createToolbarDropdown( dropdown, icon ) {
		// Configure dropdown's button properties:
		dropdown.buttonView.set( {
			icon,
			withText: true,
			tooltip: true
		} );
	}
}
