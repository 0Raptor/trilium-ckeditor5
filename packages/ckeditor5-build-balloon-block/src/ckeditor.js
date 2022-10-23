/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';
import TableSelection from '@ckeditor/ckeditor5-table/src/tableselection';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import SelectAll from '@ckeditor/ckeditor5-select-all/src/selectall';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard.js';
import Enter from '@ckeditor/ckeditor5-enter/src/enter.js';
import ShiftEnter from '@ckeditor/ckeditor5-enter/src/shiftenter.js';
import Typing from '@ckeditor/ckeditor5-typing/src/typing.js';
import Undo from '@ckeditor/ckeditor5-undo/src/undo.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import MentionCustomization from './mention_customization.js';
import UploadimagePlugin from './uploadimage';
import InternalLinkPlugin from './internallink';
import MarkdownImportPlugin from './markdownimport';
import CuttonotePlugin from './cuttonote';
import IncludeNote from './includenote';
import ReferenceLink from './referencelink';
import indentBlockShortcutPlugin from './indent_block_shortcut.js';
import removeFormatLinksPlugin from './remove_format_links.js';
import Mathematics from 'ckeditor5-math/src/math';
import AutoformatMath from 'ckeditor5-math/src/autoformatmath';

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Clipboard, Enter, SelectAll, ShiftEnter, Typing, Undo, // essentials package expanded to allow selectively disable Enter and ShiftEnter
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Superscript,
	Subscript,
	BlockQuote,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	Link,
	AutoLink,
	List,
	ListStyle,
	TodoList,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	TableSelection,
	TableCaption,
	Indent,
	IndentBlock,
	BlockToolbar,
	ParagraphButtonUI,
	HeadingButtonsUI,
	UploadimagePlugin,
	InternalLinkPlugin,
	MarkdownImportPlugin,
	CuttonotePlugin,
	TextTransformation,
	Font,
	FontColor,
	FontBackgroundColor,
	CodeBlock,
	SelectAll,
	HorizontalLine,
	RemoveFormat,
	FindAndReplace,
	Mention,
	MentionCustomization,
	IncludeNote,
	ReferenceLink,
	indentBlockShortcutPlugin,
	removeFormatLinksPlugin,
	Mathematics,
	AutoformatMath
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	toolbar: {
		items: [
			'fontSize',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'superscript',
			'subscript',
			'fontColor',
			'fontBackgroundColor',
			'code',
			'link',
			'removeFormat',
			'internallink',
			'cuttonote'
		]
	},
	image: {
		styles: [
			'alignLeft',
			'alignCenter',
			'alignRight',
			'full', // full and side are for BC since the old images have been created with these styles
			'side'
		],
		resizeOptions: [
			{
				name: 'imageResize:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'imageResize:25',
				value: '25',
				icon: 'small'
			},
			{
				name: 'imageResize:50',
				value: '50',
				icon: 'medium'
			}
		],
		toolbar: [
			'imageStyle:inline',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'imageResize:25',
			'imageResize:50',
			'imageResize:original',
			'|',
			'toggleImageCaption'
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			// heading1 is not used since that should be a note's title
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
		]
	},
	blockToolbar: [
		'heading',
		'|',
		'bulletedList', 'numberedList', 'todoList',
		'|',
		'blockQuote', 'codeBlock', 'insertTable', 'internallink', 'includeNote', 'math',
		'|',
		'outdent', 'indent', 'horizontalLine',
		'|',
		'imageUpload',
		'markdownImport',
		'findAndReplace'
	],
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties',
			'toggleTableCaption'
		]
	},
	link: {
		defaultProtocol: 'https://'
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
