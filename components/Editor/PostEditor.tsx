import { useState } from 'react'

import { SelectableBtn } from '@/Buttons/SelectableBtn'
import { InputSubmit } from '@/Inputs/InputSubmit'
import { Post } from 'types/Post'
import style from './postEditor.module.scss'

type Mode = 'preview' | 'edit'
type Props = {
    post?: Post
}

export const PostEditor: React.FC<Props> = ({ post }) => {
    const [mode, setMode] = useState<Mode>('edit')

    const handleModeChange: React.MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
        setMode(currentTarget.name as Mode)
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
            <form className={style.editor}>
                <section>
                    <textarea className={style.title}></textarea>
                    <select className={style.tags}>
                        <option>s</option>
                    </select>
                    <fieldset className={style.controls}></fieldset>
                    <textarea className={style.content}></textarea>
                </section>
                <fieldset className={style.options}>
                    <InputSubmit style={{ width: 'fit-content' }} />
                    <button>settings</button>
                </fieldset>
            </form>
        </div>
    )
}
