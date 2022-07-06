import { useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { IconBtn } from '@/Buttons/IconBtn'
import { MarkdownBtn } from '@/Buttons/MarkdownBtn'
import { SelectableBtn } from '@/Buttons/SelectableBtn'
import { InputSubmit } from '@/Inputs/InputSubmit'
import type { MarkdownType } from 'types/markdown'
import type { Post } from 'types/Post'

import { Settings } from '#/icons/Misc'
import * as Typography from '#/icons/Typography'
import { markdownHandler, parseMarkdown } from '#/lib/markdown'
import { Tooltip } from '#/modules/tooltip/Tooltip'
import style from './postEditor.module.scss'

type Mode = 'preview' | 'edit'
type Props = {
    post?: Post
}

export const PostEditor: React.FC<Props> = ({ post }) => {
    const [mode, setMode] = useState<Mode>('edit')
    const [title, setTitle] = useState(post?.title || '')
    const [content, setContent] = useState(post?.content || '')
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const handleModeChange: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        setMode(currentTarget.name as Mode)
    }

    const handleMarkdown: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        const pStart = contentRef.current?.selectionStart ?? 0
        const pEnd = contentRef.current?.selectionEnd ?? 0

        const result = markdownHandler(
            currentTarget.name as MarkdownType,
            contentRef.current?.value.substring(pStart, pEnd)
        )

        if (pStart !== 0 || pEnd !== pStart) {
            setContent(content.slice(0, pStart) + result + content.slice(pEnd))
        } else setContent(content + result)
    }

    return (
        <div className={style.container}>
            <fieldset className={style.modes}>
                <SelectableBtn name="edit" selected={mode === 'edit'} onClick={handleModeChange} />
                <SelectableBtn
                    name="preview"
                    selected={mode === 'preview'}
                    onClick={handleModeChange}
                />
            </fieldset>
            <form className={style.form}>
                {mode === 'edit' ? (
                    <section className={style.editor}>
                        <ReactTextareaAutosize
                            cacheMeasurements
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="New post title ..."
                            className={style.title}
                            autoComplete="off"
                            maxLength={64}
                            aria-label="Post title"
                            data-gramm_editor="false"
                            autoFocus
                        />
                        <select className={style.tags}>
                            <option>s</option>
                        </select>
                        <fieldset className={style.controls}>
                            <Tooltip content="Bold">
                                <MarkdownBtn
                                    name="bold"
                                    Icon={Typography.Bold}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Italic">
                                <MarkdownBtn
                                    name="italic"
                                    Icon={Typography.Italic}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="URL">
                                <MarkdownBtn
                                    name="link"
                                    Icon={Typography.Link}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Ordered List">
                                <MarkdownBtn
                                    name="ordered-list"
                                    Icon={Typography.OrderedList}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Unordered List">
                                <MarkdownBtn
                                    name="unordered-list"
                                    Icon={Typography.UnorderedList}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Heading">
                                <MarkdownBtn
                                    name="heading"
                                    Icon={Typography.Heading}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Quote">
                                <MarkdownBtn
                                    name="quote"
                                    Icon={Typography.Quote}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Code">
                                <MarkdownBtn
                                    name="code"
                                    Icon={Typography.Code}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="Codeblock">
                                <MarkdownBtn
                                    name="codeblock"
                                    Icon={Typography.CodeBlock}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <Tooltip content="File">
                                <MarkdownBtn
                                    name="file"
                                    Icon={Typography.Attach}
                                    onClick={handleMarkdown}
                                />
                            </Tooltip>
                            <IconBtn
                                name="markdown"
                                Icon={Typography.Markdown}
                                onClick={handleMarkdown}
                            />
                        </fieldset>
                        <ReactTextareaAutosize
                            cacheMeasurements
                            value={content}
                            ref={contentRef}
                            minRows={1}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Post content ..."
                            className={style.content}
                            autoComplete="off"
                            maxLength={65535}
                            aria-label="Post content"
                        />
                    </section>
                ) : (
                    <section className={style.preview}>
                        <h1 className={style.title}>{title}</h1>
                        <div className={style.tags}>
                            <button>s</button>
                        </div>
                        <div
                            className={style.content}
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
                        ></div>
                    </section>
                )}
                <fieldset className={style.options}>
                    <InputSubmit style={{ width: 'fit-content' }} label="Publish" />
                    <button type="button">
                        <Settings />
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
