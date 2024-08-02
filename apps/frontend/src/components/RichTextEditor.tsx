import ReactQuill from 'react-quill';

interface RichTextProps {
     content: string;
     onChange: (value: string) => void
}

export const RichTextEditor = ({ content, onChange }: RichTextProps) => {
      const editorStyle = {
        height: '250px', 
      };
     const myColors = [
          "purple",
          "#785412",
          "#452632",
          "#856325",
          "#963254",
          "#254563",
          "white"
        ];
        const modules = {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: myColors }],
            [{ background: myColors }]
          ]
        };

        const formats = [
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "link",
          "color",
          "image",
          "background",
          "align"
        ];

        return (
          <>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={onChange}
                style={editorStyle}
              />            
          </>
     )
}
