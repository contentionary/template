import React, { useEffect, useRef, useState } from "react";

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
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef: any = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    setEditorLoaded(true);
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);
  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onReady={onReady}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  ) : (
    <div>Editor loading</div>
  );
};

export default Editor;
