import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileUploadEditing from "./src/fileuploadediting";
import FileUploadUI from "./src/fileuploadui";

export default class Uploadfileplugin extends Plugin {
    static get requires() {
        return [ FileUploadEditing, FileUploadUI ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'fileUploadPlugin';
    }
}
