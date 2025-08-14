import React, { useState } from 'react'
import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Link, 
  Palette, 
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Subscript,
  Superscript,
  Eye
} from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditorToolbarProps {
  editor: Editor | null
  onPreview: () => void
}

export const Toolbar: React.FC<EditorToolbarProps> = ({ editor, onPreview }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)

  if (!editor) {
    return null
  }

  const fontFamilies = [
    'Arial',
    'Georgia',
    'Times New Roman',
    'Helvetica',
    'Verdana',
    'Courier New'
  ]

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px']
  const lineSpacings = ['1', '1.15', '1.5', '2', '2.5', '3']

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'
  ]

  return (
    <div className="w-full bg-[#F2EDF7] border-b border-gray-300 px-4 py-2">
      <div className="flex items-center w-full justify-between">
        {/* Font Section - 20% */}
        <div className="flex items-center flex-1 max-w-[20%]">
          <Select
            value={editor.getAttributes('textStyle').fontFamily || 'Arial'}
            onValueChange={(value) => editor.chain().focus().setFontFamily(value).run()}
          >
            <SelectTrigger className="w-full rounded-none border-none bg-transparent">
              <SelectValue placeholder="Font Family" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font}>
                  <span style={{ fontFamily: font }}>{font}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Font Type Section - 15% */}
        <div className="flex items-center flex-1 max-w-[15%]">
          <Select
            value="paragraph"
            onValueChange={(value) => {
              if (value === 'paragraph') {
                editor.chain().focus().setParagraph().run()
              } else {
                const level = parseInt(value.replace('h', '')) as 1 | 2 | 3 | 4 | 5 | 6
                editor.chain().focus().setHeading({ level }).run()
              }
            }}
          >
            <SelectTrigger className="w-full rounded-none border-none bg-transparent">
              <SelectValue placeholder="Heading" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
              <SelectItem value="h4">Heading 4</SelectItem>
              <SelectItem value="h5">Heading 5</SelectItem>
              <SelectItem value="h6">Heading 6</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Font Size Section - 10% */}
        <div className="flex items-center flex-1 max-w-[10%]">
          <Select
            value={editor.getAttributes('textStyle').fontSize || '16px'}
            onValueChange={(value) => editor.chain().focus().setFontSize(value).run()}
          >
            <SelectTrigger className="w-full rounded-none border-none bg-transparent">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Text Formatting Section - 15% */}
        <div className="flex items-center flex-1 max-w-[15%] justify-center">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive('strike') ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Color and Highlight Section - 10% */}
        <div className="flex items-center flex-1 max-w-[10%] justify-center">
          <div className="relative flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none border-none w-full"
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <Palette className="w-4 h-4" />
            </Button>
            {showColorPicker && (
              <div className="absolute top-full mt-1 p-2 bg-white border rounded-md shadow-lg z-50">
                <div className="grid grid-cols-5 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run()
                        setShowColorPicker(false)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none border-none w-full"
              onClick={() => setShowHighlightPicker(!showHighlightPicker)}
            >
              <Highlighter className="w-4 h-4" />
            </Button>
            {showHighlightPicker && (
              <div className="absolute top-full mt-1 p-2 bg-white border rounded-md shadow-lg z-50">
                <div className="grid grid-cols-5 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        editor.chain().focus().setHighlight({ color }).run()
                        setShowHighlightPicker(false)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Alignment Section - 15% */}
        <div className="flex items-center flex-1 max-w-[15%] justify-center">
          <Button
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <AlignRight className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          >
            <AlignJustify className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Line Spacing Section - 10% */}
        <div className="flex items-center flex-1 max-w-[10%]">
          <Select
            defaultValue="1.5"
            onValueChange={(value) => {
              console.log('Line spacing:', value)
            }}
          >
            <SelectTrigger className="w-full rounded-none border-none bg-transparent">
              <SelectValue placeholder="Spacing" />
            </SelectTrigger>
            <SelectContent>
              {lineSpacings.map((spacing) => (
                <SelectItem key={spacing} value={spacing}>
                  {spacing}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Sub/Superscript Section - 10% */}
        <div className="flex items-center flex-1 max-w-[10%] justify-center">
          <Button
            variant={editor.isActive('subscript') ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
          >
            <Subscript className="w-4 h-4" />
          </Button>

          <Button
            variant={editor.isActive('superscript') ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none border-none flex-1"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
          >
            <Superscript className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-8 w-px bg-gray-400 mx-1" />

        {/* Preview Section - 10% */}
        <div className="flex items-center flex-1 max-w-[10%]">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none border-none w-full"
            onClick={onPreview}
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  )
}