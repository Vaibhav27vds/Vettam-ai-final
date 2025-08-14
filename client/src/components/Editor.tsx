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

// Define page sizes
export interface PageSize {
  name: string
  width: number
  height: number
  margin: number
}

export const pageSizes: PageSize[] = [
  { name: 'A4', width: 816, height: 1056, margin: 96 },
  { name: 'A3', width: 1123, height: 1587, margin: 118 }, 
  { name: 'A5', width: 595, height: 842, margin: 71 }, 
  { name: 'Letter', width: 816, height: 1056, margin: 96 }, 
  { name: 'Legal', width: 816, height: 1344, margin: 96 }, 
  { name: 'Tabloid', width: 1056, height: 1632, margin: 96 }, 
]

export const Editor = () => {
  const [pages, setPages] = useState<number[]>([1])
  const [currentPageSize, setCurrentPageSize] = useState<PageSize>(pageSizes[0]) // Default to A4

  const editor = useEditor({
    immediatelyRender: false,
    editorProps:{
        attributes: {
            style: `padding-left:0px; padding-right:0px; min-height:${currentPageSize.height}px; width:${currentPageSize.width}px;`,
            class: 'focus:outline-none print:border-0 bg-white border border-[#c7c7c7] border-b-1 flex flex-col pt-10 pr-14 pb-10 cursor-text'
        }
    },
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Pagination.configure({
        pageHeight: currentPageSize.height, 
        pageWidth: currentPageSize.width,   
        pageMargin: currentPageSize.margin,
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
      const content = editor.getHTML()
      const contentHeight = editor.view.dom.scrollHeight
      const pageHeight = currentPageSize.height
      const neededPages = Math.ceil(contentHeight / pageHeight)
      
      if (neededPages > pages.length) {
        setPages(Array.from({ length: neededPages }, (_, i) => i + 1))
      }
    }
  })

  const handlePageSizeChange = (newPageSize: PageSize) => {
    setCurrentPageSize(newPageSize)
    

    if (editor) {
      editor.extensionManager.extensions.forEach((extension) => {
        if (extension.name === 'pagination') {
          extension.options.pageHeight = newPageSize.height
          extension.options.pageWidth = newPageSize.width
          extension.options.pageMargin = newPageSize.margin
        }
      })
      
      const editorElement = editor.view.dom as HTMLElement
      editorElement.style.minHeight = `${newPageSize.height}px`
      editorElement.style.width = `${newPageSize.width}px`
      
      editor.view.updateState(editor.state)
    }
  }

  const addPageBreak = () => {
    editor?.chain().focus().setPageBreak().run()
  }

  return (
    <>
      <Toolbar 
        editor={editor} 
        onPreview={() => {}} 
        currentPageSize={currentPageSize}
        onPageSizeChange={handlePageSizeChange}
      />
      <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div 
          className="min-w-max flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0"
          style={{ width: `${currentPageSize.width}px` }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )
}

export default Editor