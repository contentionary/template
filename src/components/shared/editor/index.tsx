// import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { CKEditor } = require("@ckeditor/ckeditor5-react");

const Editor = ({
  onBlur,
  onFocus,
  onReady,
  data,
  onChange,
}: {
  onBlur?: Function;
  onFocus?: Function;
  onReady?: Function;
  data?: string;
  onChange: Function;
}) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onReady={onReady}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default Editor;
