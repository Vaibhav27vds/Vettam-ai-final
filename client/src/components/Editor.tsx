"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import { useState } from 'react'
import { Toolbar } from './Toolbar'
import { Pagination } from 'tiptap-pagination-breaks';

export const Editor = () => {

    const [pages, setPages] = useState<number[]>([1])

  const editor = useEditor({
    immediatelyRender: false,
    editorProps:{
        attributes: {
            style: 'padding-left:0px; padding-right:0px;',
            class: 'focus:outline-none print:border-0 bg-white  border border-[#c7c7c7] border-b-1 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text '
        }
    },
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Pagination.configure({
      pageHeight: 1056, 
      pageWidth: 816,   
    pageMargin: 96,
       label: 'Page',    
      showPageNumber: false,
    }),
      Highlight.configure({
        multicolor: true
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false
      }),
      Underline,
      FontFamily.configure({
        types: ['textStyle']
      })
    ],
    content: '<p>Start writing your document...</p>',
    onUpdate: ({ editor }) => {
      // Auto-pagination logic - simplified for now
      const content = editor.getHTML()
      const contentHeight = editor.view.dom.scrollHeight
      const pageHeight = 297 * 3.779527559 // 297mm to pixels (approx)
      const neededPages = Math.ceil(contentHeight / pageHeight)
      
      if (neededPages > pages.length) {
        setPages(Array.from({ length: neededPages }, (_, i) => i + 1))
      }
    }
  })

  const addPageBreak = () => {
    editor?.chain().focus().setPageBreak().run()
  }

  return (
    <>
    <Toolbar editor={editor} onPreview={() => {}} />
        <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
      <EditorContent editor={editor} />
      </div>
      </div>
    </>
  )
}

export default Editor