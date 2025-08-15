"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
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
  const [currentPageSize, setCurrentPageSize] = useState<PageSize>(pageSizes[0])
  const [hasHeader, setHasHeader] = useState(false)
  const [hasFooter, setHasFooter] = useState(false)
  const [headerContent, setHeaderContent] = useState('')
  const [footerContent, setFooterContent] = useState('')

  const getEditorPadding = () => {
    const headerHeight = hasHeader ? 60 : 0
    const footerHeight = hasFooter ? 60 : 0
    const topPadding = hasHeader ? 10 : 40
    const bottomPadding = hasFooter ? 10 : 40
    
    return {
      paddingTop: topPadding,
      paddingBottom: bottomPadding,
      paddingLeft: 56,
      paddingRight: 56
    }
  }

  const editorPadding = getEditorPadding()

  const editor = useEditor({
    immediatelyRender: false,
    editorProps:{
        attributes: {
            style: ``,
            class: 'focus:outline-none print:border-0 bg-transparent cursor-text h-full'
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
        showPageNumber: true,
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
      const headerHeight = hasHeader ? 60 : 0
      const footerHeight = hasFooter ? 60 : 0
      editorElement.style.minHeight = `calc(${newPageSize.height}px - ${headerHeight}px - ${footerHeight}px)`
      editorElement.style.width = '100%'
      
      editor.view.updateState(editor.state)
    }
  }

  const addPageBreak = () => {
    editor?.chain().focus().setPageBreak().run()
  }

  const addHeader = () => {
    setHasHeader(true)
    setHeaderContent('Header text...')
  }

  const addFooter = () => {
    setHasFooter(true)
    setFooterContent('Footer text...')
  }

  const removeHeader = () => {
    setHasHeader(false)
    setHeaderContent('')
  }

  const removeFooter = () => {
    setHasFooter(false)
    setFooterContent('')
  }

  return (
    <>
      <Toolbar 
        editor={editor} 
        onPreview={() => {}} 
        currentPageSize={currentPageSize}
        onPageSizeChange={handlePageSizeChange}
        hasHeader={hasHeader}
        hasFooter={hasFooter}
        onAddHeader={addHeader}
        onAddFooter={addFooter}
        onRemoveHeader={removeHeader}
        onRemoveFooter={removeFooter}
      />
      <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'>
        <div 
          className="min-w-max flex justify-center py-4 print:py-0 mx-auto print:w-full print:min-w-0 relative"
          style={{ width: `${currentPageSize.width}px` }}
        >
          <div 
            className="relative bg-white border border-[#c7c7c7] flex flex-col overflow-hidden"
            style={{ width: `${currentPageSize.width}px`, height: `${currentPageSize.height}px` }}
          >
            {hasHeader && (
              <div className="px-14 py-3 border-b border-gray-300 flex-shrink-0" style={{ height: '60px' }}>
                <input
                  type="text"
                  value={headerContent}
                  onChange={(e) => setHeaderContent(e.target.value)}
                  className="w-full text-center border-none outline-none text-sm bg-transparent h-full flex items-center justify-center"
                  placeholder="Enter header text..."
                />
              </div>
            )}
            
            <div className="flex-1 overflow-hidden">
              <EditorContent editor={editor} />
            </div>
            
            {hasFooter && (
              <div className="px-14 py-3 border-t border-gray-300 flex-shrink-0" style={{ height: '60px' }}>
                <input
                  type="text"
                  value={footerContent}
                  onChange={(e) => setFooterContent(e.target.value)}
                  className="w-full text-center border-none outline-none text-sm bg-transparent h-full flex items-center justify-center"
                  placeholder="Enter footer text..."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Editor