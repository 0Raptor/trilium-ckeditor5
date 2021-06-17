/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import ModelTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/modeltesteditor';
import { setData, stringify } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import FindAndReplaceEditing from '../src/findandreplaceediting';
import FindCommand from '../src/findcommand';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

describe( 'FindCommand', () => {
	let editor, model, command;

	beforeEach( () => {
		return ModelTestEditor
			.create( {
				plugins: [ FindAndReplaceEditing, Paragraph ]
			} )
			.then( newEditor => {
				editor = newEditor;
				model = editor.model;
				command = new FindCommand( editor );
			} );
	} );

	afterEach( () => {
		return editor.destroy();
	} );

	describe( 'isEnabled', () => {
		it( 'should be enabled in empty document', () => {
			setData( model, '[]' );
			expect( command.isEnabled ).to.be.true;
		} );

		it( 'should be enabled by default', () => {
			setData( model, '<paragraph>foo[]</paragraph>' );
			expect( command.isEnabled ).to.be.true;
		} );
	} );

	describe( 'execute()', () => {
		describe( 'with string passed', () => {
			it( 'places markers correctly in the model', () => {
				setData( model, '<paragraph>[]Foo bar baz. Bam bar bom.</paragraph>' );

				const { results } = command.execute( 'bar' );
				const markers = results.map( item => {
					// Replace markers id to a predefined value, as originally these are unique random ids.
					item.marker.name = 'X';

					return item.marker;
				} );

				expect( stringify( model.document.getRoot(), null, markers ) ).to.equal(
					'<paragraph>Foo <X:start></X:start>bar<X:end></X:end> baz. Bam <X:start></X:start>bar<X:end></X:end> bom.</paragraph>'
				);
			} );

			it( 'returns no result if nothing matched', () => {
				setData( model, '<paragraph>[]Foo bar baz. Bam bar bom.</paragraph>' );

				const { results } = command.execute( 'missing' );

				expect( results.length ).to.equal( 0 );
			} );

			it( 'assigns proper labels to matches', () => {
				setData( model, '<paragraph>Foo bar b[]az. Bam bar bom.</paragraph>' );

				const { results } = command.execute( 'bar' );
				const labels = results.map( result => result.label );

				expect( labels ).to.deep.equal( [ 'bar', 'bar' ] );
			} );

			it( 'assigns non-empty ids for each match', () => {
				setData( model, '<paragraph>Foo bar b[]az. Bam bar bom.</paragraph>' );

				const { results } = command.execute( 'bar' );
				const ids = results.map( result => result.id );

				for ( let i = 0; i < ids.length; i++ ) {
					const currentId = ids[ i ];

					expect( currentId, `id #${ i }` ).to.be.a.string;
					expect( currentId.length, `id #${ i }` ).to.not.equal( 0 );
				}
			} );

			it( 'assigns an unique ids for each match', () => {
				setData( model, '<paragraph>Foo bar b[]az. Bam bar bom bar.</paragraph>' );

				const { results } = command.execute( 'bar' );
				const ids = results.map( result => result.id );

				expect( ids[ 0 ] ).not.to.equal( ids[ 1 ] );
				expect( ids[ 1 ] ).not.to.equal( ids[ 2 ] );
			} );
		} );
	} );
} );
