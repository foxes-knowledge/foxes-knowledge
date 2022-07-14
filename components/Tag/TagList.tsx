import type { Tag } from 'types/Tag'
import { TagItem } from './TagItem'
import style from './tagList.module.scss'

type Props = {
    tags: Tag[]
}

export const TagList: React.FC<Props> = ({ tags }) => (
    <div className={style.tags}>
        {tags.map(tag => (
            <TagItem key={tag.id} tag={tag} />
        ))}
    </div>
)
