import { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { MarkdownBtn } from '@/Buttons/MarkdownBtn'
import { SelectableBtn } from '@/Buttons/SelectableBtn'
import { InputSubmit } from '@/Inputs/InputSubmit'
import type { Post } from 'types/Post'

import { Settings } from '#/icons/Misc'
import * as Typography from '#/icons/Typography'
import style from './postEditor.module.scss'

type Mode = 'preview' | 'edit'
type Props = {
    post?: Post
}

export const PostEditor: React.FC<Props> = ({ post }) => {
    const [mode, setMode] = useState<Mode>('edit')
    const [title, setTitle] = useState(post?.title || '')
    const [content, setContent] = useState(post?.content || '')

    const handleModeChange: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        setMode(currentTarget.name as Mode)
    }

    const handleMarkdown: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {}

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
                        <MarkdownBtn name="bold" Icon={Typography.Bold} onClick={handleMarkdown} />
                        <MarkdownBtn
                            name="italic"
                            Icon={Typography.Italic}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn
                            name="ordered"
                            Icon={Typography.OrderedList}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn
                            name="unordered"
                            Icon={Typography.UnorderedList}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn
                            name="heading"
                            Icon={Typography.Heading}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn
                            name="quote"
                            Icon={Typography.Quote}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn name="code" Icon={Typography.Code} onClick={handleMarkdown} />
                        <MarkdownBtn
                            name="codeblock"
                            Icon={Typography.CodeBlock}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn
                            name="attach"
                            Icon={Typography.Attach}
                            onClick={handleMarkdown}
                        />
                        <MarkdownBtn
                            name="markdown"
                            Icon={Typography.Markdown}
                            onClick={handleMarkdown}
                        />
                    </fieldset>
                    <ReactTextareaAutosize
                        cacheMeasurements
                        value={content}
                        minRows={1}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Post content ..."
                        className={style.content}
                        autoComplete="off"
                        maxLength={65535}
                        aria-label="Post content"
                    />
                </section>
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
